import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Store authenticated admin data
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      navigate("/admin/profile");
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(err.message || "Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <div className="admin-logo-mark">
            <span>MED</span>TRACK
            <div className="portal-sub">ADMIN PORTAL</div>
          </div>
          <h2>Staff Sign In</h2>
          <p>Access the clinical drug reference and formulary management system.</p>
        </div>

        {error && <div className="admin-auth-error">{error}</div>}

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="admin@medtrack.org"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <button type="submit" className="btn-admin-auth">
            Sign In to Admin Portal
          </button>
        </form>

        <div className="admin-auth-footer">
          <p>
            Need an admin account? <Link to="/admin/signup">Create staff profile</Link>
          </p>
          <div className="switch-portal">
            <Link to="/">← Back to Patient Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
