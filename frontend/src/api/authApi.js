import api from "./axios";

export const loginApi = (body) => api.post("/auth/login", body);
export const registerApi = (body) => api.post("/auth/register", body);
export const meApi = () => api.get("/auth/me");
