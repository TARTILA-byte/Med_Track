import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminLogin.css";

function AdminSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    //department: "Drug Information & Formulary",
    //role: "Clinical Pharmacist",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register admin in MongoDB.");
      }

      // Save to localStorage for frontend session display
      localStorage.setItem("adminUser", JSON.stringify(data.admin));

      setSuccessMsg("Admin registered into MongoDB successfully! Redirecting...");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1200);
    } catch (err) {
      console.error("Admin Sign Up Error:", err);
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
          <h2>Create Staff Profile</h2>
          <p>Register as an administrator to publish drug reference monographs.</p>
        </div>

        {error && <div className="admin-auth-error">{error}</div>}
        {successMsg && <div className="admin-auth-success">{successMsg}</div>}

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Dr. Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Staff Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane.doe@medtrack.org"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>



          <button type="submit" className="btn-admin-auth">
            Create Admin Account
          </button>
        </form>

        <div className="admin-auth-footer">
          <p>
            Already have an account? <Link to="/admin/login">Sign in here</Link>
          </p>
          <div className="switch-portal">
            <Link to="/">← Back to Patient Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
