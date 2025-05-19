// src/api/jobApplicationApi.ts
import axiosInstance from "./axiosInstance";

export const submitJobApplication = async (
  data: {
    title: string;
    company: string;
    location: string;
    responsibilities: string;
    qualifications: string;
    other: string;
  },
  resume: File
) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("company", data.company);
  formData.append("location", data.location);
  formData.append("responsibilities", data.responsibilities);
  formData.append("qualifications", data.qualifications);
  formData.append("other", data.other);
  formData.append("resume", resume);

  return axiosInstance.post("/job-application", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const startInterview = async (userId: number, sessionId: number) => {
  return axiosInstance.get("/start-interview", {
    params: { user_id: userId, session_id: sessionId },
  });
};

export const nextQuestion = async (sessionId: number) => {
  return axiosInstance.get("/next-question", {
    params: { session_id: sessionId },
  });
};

export const storeAnswer = async (sessionId: number, answer: string) => {
  return axiosInstance.post("/answer", { session_id: sessionId, answer });
};

export const getScore = async (sessionId: number) => {
  return axiosInstance.get("/score", {
    params: { session_id: sessionId },
  });
};
