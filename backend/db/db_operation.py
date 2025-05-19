import mysql.connector
import fitz
import docx
import mimetypes
from io import BytesIO
from datetime import datetime
from config import db


def insert_user_details(title, company, location, responsibilities, qualifications, other, resume):
    conn = mysql.connector.connect(**db)
    cursor = conn.cursor()

    insert_query = """INSERT INTO users (title, company, location, responsibilities, qualifications, other, resume, resume_file_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
    cursor.execute(insert_query, (title, company, location,
                   responsibilities, qualifications, other, resume.file.read(), resume.filename))
    conn.commit()

    user_id = cursor.lastrowid

    query = """INSERT INTO interview_sessions (user_id) VALUES (%s)"""
    cursor.execute(query, (user_id, ))
    conn.commit()
    session_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return session_id, user_id


def extract_text(file_bytes: bytes, filename: str) -> str:
    mime_type, _ = mimetypes.guess_type(filename)

    if filename.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")

    elif filename.endswith(".pdf"):
        text = ""
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text()
        return text

    elif filename.endswith(".docx"):
        doc = docx.Document(BytesIO(file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])

    else:
        raise ValueError(
            "Unsupported resume file type. Only PDF, DOCX, and TXT are allowed.")


def get_users_info(user_id):
    conn = mysql.connector.connect(**db)
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            title, company, location, responsibilities, 
            qualifications, other, resume, resume_file_name 
        FROM users WHERE id = %s
    """
    cursor.execute(query, (user_id,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        raise ValueError("User not found")

    resume_bytes = user.pop("resume")
    resume_filename = user.pop("resume_file_name")
    resume_text = extract_text(resume_bytes, resume_filename)

    query = "SELECT completed_at FROM interview_sessions WHERE user_id = %s"
    cursor.execute(query, (user_id, ))
    completed = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        **user,
        "resume_text": resume_text,
        "resume_file_name": resume_filename,
        "completed": completed['completed_at']
    }


def add_conversation_history(session_id, role, content):
    conn = mysql.connector.connect(**db)
    cursor = conn.cursor(dictionary=True)

    query = """INSERT INTO conversation_history (session_id, role, content) VALUES (%s, %s, %s)"""
    cursor.execute(query, (session_id, role, content))
    conn.commit()
    cursor.close()
    conn.close()


def get_conversation_history(session_id):
    conn = mysql.connector.connect(**db)
    cursor = conn.cursor(dictionary=True)

    query = """SELECT role, content FROM conversation_history WHERE session_id = %s"""
    cursor.execute(query, (session_id, ))

    records = cursor.fetchall()
    history = [{"role": row['role'], "parts": row['content']}
               for row in records]
    cursor.close()
    conn.close()

    return history


def add_score(session_id, score):
    conn = mysql.connector.connect(**db)
    cursor = conn.cursor()

    query = """UPDATE interview_sessions SET completed_at = %s, final_score = %s WHERE id = %s"""
    cursor.execute(query, (datetime.now(), score, session_id))
    conn.commit()

    cursor.close()
    conn.close()
