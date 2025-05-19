# Virtual Interview Assistant

Virtual Interview Assistant is an AI-powered web application that simulates a real-time interview experience using your resume and job description. It leverages Google Gemini API for generating and evaluating interview questions.

---

## 🗂️ Project Structure

- `frontend/` – React + TypeScript frontend
- `backend/` – FastAPI + Python backend

---

## 🚀 Getting Started

Follow the steps below to set up the project locally.

---

### ✅ Step 1: Clone the Repository

```bash
git clone git@github.com:shivam-2002/ai-virtual-interview.git
cd ai-virtual-interview


⸻

🗃️ Backend Setup (backend/)

⸻

✅ Step 2: Set Up the Database

Make sure MySQL is installed and running. Then execute the schema:

mysql -u <your_username> -p < backend/sql/schema.sql

OR

manually copy content of backend/sql/schema.sql and execute inside mysql


⸻

✅ Step 3: Create Virtual Environment

Navigate to the backend folder:

cd backend

On macOS/Linux:

python3 -m venv venv

On Windows:

python -m venv venv


⸻

✅ Step 4: Activate the Virtual Environment

On macOS/Linux:

source venv/bin/activate

On Windows:

venv\Scripts\activate

⸻

✅ Step 5: Install Backend Dependencies

pip install -r requirements.txt


⸻

✅ Step 6: Configure Project Settings
	•	Create a config.ini file in the backend/ directory by copying the sample:

cp config.ini.sample config.ini

	•	Edit the config.ini file and update:
	•	Your MySQL database credentials
	•	Your Google Gemini API key
	•	Frontend url (If you are planning to run on different port or on different server)

⸻

✅ Step 7: Start the Backend Server

Make sure your virtual environment is active:

uvicorn main:app --reload

Backend will run at: http://localhost:8000

⸻

💻 Frontend Setup (frontend/)

⸻

✅ Step 8: Navigate to Frontend Folder

cd ../frontend


⸻

✅ Step 9: Update Environment Configuration

Edit the .env file in the frontend/ directory to point to your backend API:

REACT_APP_BACKEND_BASE_URL=http://localhost:8000


⸻

✅ Step 10: Install Frontend Dependencies

npm install


⸻

✅ Step 11: Start the Frontend Server

npm start

Frontend will run at: http://localhost:3000

⸻

🧪 Using the App

⸻

✅ Step 12: Open the App in Your Browser

Visit: http://localhost:3000

⸻

✅ Step 13: Submit Resume and Job Description
	1.	Upload your resume
	2.	Fill the job details
	3.	Click Submit

⸻

✅ Step 14: Start the Interview
	1.	Click Start Interview
	2.	Follow on-screen instructions to answer each question
	3.	Type or speak your answers
	4.	Submit each response
	5.	End interview to view results

⸻

🛠️ Tech Stack
	•	Frontend: React, TypeScript
	•	Backend: FastAPI, Python
	•	Database: MySQL
	•	AI Service: Google Gemini API

```
