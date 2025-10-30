// src/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Backend chạy ở đây
});

export default api;
