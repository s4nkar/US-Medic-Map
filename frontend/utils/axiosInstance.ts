import axios from "axios";

// This is for development purposes only
const host = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/api$/, "").replace(/\/$/, "");

const axiosInstance = axios.create({
    // 2. Build the versioned path exactly once
    baseURL: `${host}/api/v1/map/`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;