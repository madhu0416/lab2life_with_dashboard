import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000"; // fallback for local dev

const API = axios.create({
  baseURL,
});

export default API;