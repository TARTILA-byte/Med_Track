import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/api";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/login/check");
        if (response.data && response.data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("AUTH ERROR:", error);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return <h2>Checking authentication...</h2>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;