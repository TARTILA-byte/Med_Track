import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // CSS file import

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // To Home page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          MED<span>TRACK</span>
        </div>

        <h2>Welcome to MedTrack</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;