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


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


instance.interceptors.response.use(
  (resp) => {
    const body = resp.data;

   
    if (typeof body === "object" && "ok" in body) {
      if (body.ok) return body.data;

      // backend error
      return Promise.reject({
        response: { data: { message: body.error || "Server error" } },
      });
    }

    // fallback
    return body;
  },

  (error) => {
    // network error
    if (!error.response) {
      return Promise.reject({
        response: { data: { message: "Network error" } },
      });
    }

    const status = error.response.status;

    // Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    // Extract backend message
    const payload = error.response.data;
    const message =
      (payload && (payload.error || payload.message)) || "Request Failed";

    return Promise.reject({ response: { data: { message } } });
  }
);

export default instance;

