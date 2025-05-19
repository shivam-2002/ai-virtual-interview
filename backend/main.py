from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from config import frontend
from db import insert_user_details, get_users_info, add_conversation_history, get_conversation_history, add_score
from gemini_operation import get_gemini_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend['base_url']],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/job-application")
async def handle_job_application(
    title: str = Form(...),
    company: str = Form(...),
    location: str = Form(...),
    responsibilities: str = Form(...),
    qualifications: str = Form(...),
    other: str = Form(...),
    resume: UploadFile = File(...)
):
    try:
        session_id, user_id = insert_user_details(title, company, location,
                                                  responsibilities, qualifications, other, resume)
        return JSONResponse({'code': 200, 'session_id': session_id, 'user_id': user_id})
    except Exception as e:
        return JSONResponse({'code': 400, 'message': str(e)})


@app.get("/start-interview")
async def start_interview(user_id: int, session_id: int):
    try:
        users_info = get_users_info(user_id)
        if users_info['completed']:
            return JSONResponse({'code': 400, 'completed': True})

        prompt = f"""
            Generate interview question for job title {users_info["title"]}, by considering {users_info['company']}  as company, based on below candidates resume. Generate one question at a time. Only give the relavent text don't include any formal message.

            {users_info['resume_text']}
        """
        add_conversation_history(session_id, 'user', prompt)

        res = get_gemini_response(prompt, [])
        add_conversation_history(session_id, 'model', res)

        return JSONResponse({'code': 200, 'question': res})

    except Exception as e:
        return JSONResponse({'code': 400, 'message': str(e), 'question': ''})


@app.get("/next-question")
async def next_question(session_id: int):
    try:
        prompt = f"""
            Ask next interview question
        """
        history = get_conversation_history(session_id)
        res = get_gemini_response(prompt, history)
        add_conversation_history(session_id, 'model', res)

        return JSONResponse({'code': 200, 'question': res})

    except Exception as e:
        return JSONResponse({'code': 400, 'message': str(e), 'question': ''})


class AnswerRequest(BaseModel):
    session_id: int
    answer: str


@app.post("/answer")
async def add_answer(request: AnswerRequest):
    try:
        add_conversation_history(request.session_id, 'user', request.answer)

        return JSONResponse({'code': 200})

    except Exception as e:
        return JSONResponse({'code': 400, 'message': str(e)})


@app.get("/score")
async def get_score(session_id: int):
    try:
        history = get_conversation_history(session_id)
        prompt = "Based upon interaction can you score user on the scale of 100, give numeric value only. In case of no response give 0"

        res = get_gemini_response(prompt, history)
        add_conversation_history(session_id, 'model', res)
        add_score(session_id, res)

        prompt = "Based upon interaction give a short feedback"

        feedback = get_gemini_response(prompt, history)
        add_conversation_history(session_id, 'model', feedback)

        return JSONResponse({'code': 200, 'score': res, 'feedback': feedback})

    except Exception as e:
        return JSONResponse({'code': 400, 'message': str(e), 'score': ''})
