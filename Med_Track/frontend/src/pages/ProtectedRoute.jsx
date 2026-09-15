import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/login/check",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("PROTECTED ROUTE RESPONSE:", data);
        console.log("AUTHENTICATED:", data.authenticated);

        if (data.authenticated === true) {
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

  if (authenticated === false) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;