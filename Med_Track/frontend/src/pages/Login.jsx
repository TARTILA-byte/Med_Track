import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await api.post("/login", { email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/all-medicines", { replace: true });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || err.message || "Login failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-logo">
          MED<span>TRACK</span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">

          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            className="login-input"
            required
          />

          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter your password"
            className="login-input"
            required
          />

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="login-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signIn")}>
            Sign In
          </span>
        </p>

        <div className="admin-switch-link">
          <span>Are you an administrator? </span>
          <span onClick={() => navigate("/admin/login")}>
            Admin Login →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;