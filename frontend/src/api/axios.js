import axios from "axios";

// 백엔드 서버주소 확인 후 해당 서버주소:포트번호 입력
const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/py" : "http://localhost:8000";
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,

  headers: {
    "Content-Type": "application/json",
  },
});
