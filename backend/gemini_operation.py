import google.generativeai as genai
from config import gemini_cred


def get_gemini_response(prompt, history):
    genai.configure(api_key=gemini_cred["api_key"])
    g_model = genai.GenerativeModel('gemini-2.0-flash-lite')
    chat = g_model.start_chat(history=history)
    response = chat.send_message(prompt)
    return response.text
