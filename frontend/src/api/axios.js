import axios from "axios";

// ------------ Base URL ------------
const apiRoot = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const baseURL = apiRoot.endsWith("/")
  ? `${apiRoot.slice(0, -1)}/api`
  : `${apiRoot}/api`;

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// ------------ Attach token ------------
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ------------ Response Interceptor ------------
instance.interceptors.response.use(
  (resp) => {
    const body = resp.data;

    // Standard backend wrapper: { ok, data, error }
    if (typeof body === "object" && "ok" in body) {
      if (body.ok) return body.data;

      return Promise.reject({
        response: { data: { message: body.error || "Server error" } },
      });
    }

    return body;
  },

  (error) => {
    // No server response → network error
    if (!error.response) {
      return Promise.reject({
        response: { data: { message: "Network error" } },
      });
    }

    const { status } = error.response;

    // ----------- 401 Handling (IMPORTANT!) -------------
    if (status === 401) {
      const token = localStorage.getItem("token");

      // If there IS a token → expired session → logout + redirect
      if (token) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      // If NO token (login page wrong password) → pass error to UI
      return Promise.reject({
        response: { data: { message: "Invalid email or password" } },
      });
    }

    // ----------- Other errors -------------
    const payload = error.response.data;
    const message =
      payload?.error || payload?.message || "Request Failed";

    return Promise.reject({ response: { data: { message } } });
  }
);

export default instance;
