// src/api/axiosInstance.ts
import axios from "axios";
import { BACKEND_BASE_URL } from "../constants/env";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
