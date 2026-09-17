import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheck = error.config?.url?.includes("/login/check");

    if (
      error.response &&
      error.response.status === 401 &&
      !isAuthCheck
    ) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;