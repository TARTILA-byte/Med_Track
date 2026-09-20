import React from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <header className="admin-navbar">
        <Link to="/admin/profile" style={{ textDecoration: "none" }}>
          <div className="admin-brand">
            <span className="brand-med">MED</span>
            <span className="brand-track">TRACK</span>
            <span className="admin-badge">Admin</span>
          </div>
        </Link>

        <nav className="admin-nav-links">
          <NavLink
            to="/admin/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
          <NavLink
            to="/admin/add-drug-reference"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Drug Reference
          </NavLink>
          <Link to="/drug-info">Drug Catalog</Link>

        </nav>
      </header>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
