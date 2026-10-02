import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// ১. Request Interceptor: প্রতিটি API রিকুয়েস্টের সাথে Token পাঠিয়ে দেওয়া
api.interceptors.request.use(
  (config) => {
    // localStorage বা sessionStorage থেকে token নেওয়ার চেষ্টা করবে (যদি থাকে)
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ২. Response Interceptor: 401 Unauthorized হলে Redirect করা
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";
    const isAuthCheck = requestUrl.includes("check");

    if (error.response && error.response.status === 401 && !isAuthCheck) {
      const currentPath = window.location.pathname;

      if (currentPath.startsWith("/admin")) {
        if (currentPath !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      } else {
        if (currentPath !== "/login" && currentPath !== "/") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
