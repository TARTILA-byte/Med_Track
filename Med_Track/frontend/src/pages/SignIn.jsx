import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
const SignIn = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed! Email might already exist.");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setSuccess("Account created successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          MED<span>TRACK</span>
        </div>

        <h3 style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}>
          Create an Account
        </h3>

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p
            style={{
              color: "green",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {success}
          </p>
        )}

        <form onSubmit={handleSignUp} className="login-form">
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter your full name"
            className="login-input"
            required
          />
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
            placeholder="Create a password"
            className="login-input"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p class="login-text">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;