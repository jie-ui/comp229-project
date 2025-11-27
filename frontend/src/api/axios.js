import axios from "axios";

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
    const payload = resp.data.data;

 
    if (payload && Object.prototype.hasOwnProperty.call(payload, "ok")) {
      if (payload.ok) return payload.data;

      const msg = payload.error || "Server error";
      return Promise.reject({ response: { data: { message: msg } } });
    }
    return resp.data.data;
  },

 
  (error) => {
  
    if (!error.response) {
      return Promise.reject({
        response: { data: { message: "Network error" } },
      });
    }

    const status = error.response.status;

    
    if (status === 401) {
      localStorage.removeItem("token");  
      window.location.href = "/login";  
      return; 
    }

    const payload = error.response.data;
    const message =
      (payload && (payload.error || payload.message)) || "Request failed";

    return Promise.reject({ response: { data: { message } } });
  }
);

export default instance;
