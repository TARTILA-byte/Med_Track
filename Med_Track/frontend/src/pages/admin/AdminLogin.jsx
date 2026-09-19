import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminLogin.css";
import api from "../../api/api";

const AdminLogin=()=> {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/admin/login",
        { email, password },
        { withCredentials: true } 
      );

      if (response.status === 200) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data.admin));
        navigate("/admin/profile", { replace: true });
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError(
        err.response?.data?.message || err.message || "Admin Login failed!"
      );
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

        <form className="admin-auth-form" onSubmit={handleLogin}>
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

          <button type="submit" className="btn-admin-auth" disabled={loading}>
            {loading ? "Signing In..." : "Sign In to Admin Portal"}
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
