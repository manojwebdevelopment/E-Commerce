import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const registerUser = async (userData) =>{
    const response = await api.post("/auth/signup", userData);
    return response.data;
}

export const loginUser = async (userData) =>{
    const response = await api.post("/auth/login", userData);
    return response.data;
}

export const verifyUser = async () =>{
    const response = await api.post("/auth/userverify");
    return response.data;
}



export default api;