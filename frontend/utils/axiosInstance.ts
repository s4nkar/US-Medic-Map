import axios from "axios";

// This is for development purposes only
export const host = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/";
const API_BASE_URL = `${host}/api/v1/`;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;