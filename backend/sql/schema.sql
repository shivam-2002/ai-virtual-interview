CREATE DATABASE IF NOT EXISTS ai_interview;
USE ai_interview;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title CHAR(200),
    company CHAR(200),
    location VARCHAR(500),
    responsibilities VARCHAR(1000),
    qualifications VARCHAR(1000),
    other VARCHAR(5000),
    resume LONGBLOB,
    resume_file_name CHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interview_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  final_score CHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conversation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    role ENUM('user', 'model') NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES interview_sessions(id)
);
