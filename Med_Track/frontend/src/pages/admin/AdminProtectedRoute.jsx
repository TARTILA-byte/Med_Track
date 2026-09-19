import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../api/api"; 

const AdminProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await api.get("/admin/check", { withCredentials: true });
        
        if (response.data && response.data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("ADMIN AUTH ERROR:", error);
        setAuthenticated(false);
      }
    };

    checkAdminAuth();
  }, []);

  if (authenticated === null) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Checking Admin Privileges...</div>;
  }

  return authenticated ? (children ? children : <Outlet />) : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;