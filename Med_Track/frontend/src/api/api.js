import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, 
});

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
      } 
      else {
        if (currentPath !== "/login" && currentPath !== "/") {
          window.location.href = "/login";
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;