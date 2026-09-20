import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import api from "../api/api";

function Profile() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || "User",
          email: parsed.email || "user@example.com",
          accountType: "Patient account",
          gender: parsed.gender || "Not specified",
          age: parsed.age || "--",
          weight: parsed.weight || "--",
          bloodType: parsed.bloodType || "--",
        };
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

  });

  const [careTeam] = useState({
    name: "Dr. Sarah Chen",
    role: "Primary care physician",
    lastUpdated: "08/02/2026",
  });

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleLogout = async () => {
    try {
      await api.post("/login/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("adminToken");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Your Profile</h1>
        <p>Your personal health details, care information, and account settings.</p>
      </header>

      <div className="profile-layout">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-identity">
              <div className="avatar-circle">{user.name.charAt(0)}</div>
              <div className="identity-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <span className="badge">{user.accountType}</span>
              </div>
            </div>

            <div className="section-divider" />

            <div className="health-details-header">
              <div>
                <h3>Health details</h3>
                <p className="section-subtitle">Keep these details current for a clearer care record.</p>
              </div>
              <button className="edit-btn" onClick={handleEditProfile}>
                Edit profile
              </button>
            </div>

            <div className="health-details-grid">
              <div className="detail-item">
                <span className="detail-label">GENDER</span>
                <span className="detail-value">{user.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">AGE</span>
                <span className="detail-value">{user.age} years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">WEIGHT</span>
                <span className="detail-value">
                  {user.weight} <span className="unit">kg</span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">BLOOD TYPE</span>
                <span className="detail-value">{user.bloodType}</span>
              </div>
            </div>
          </div>

          <div className="signout-row">
            <div>
              <h4>Sign out of MedTrack</h4>
              <p>You can sign back in to access your medication plan.</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="privacy-card">
            <h4>Your information stays private</h4>
            <p>MedTrack uses these details only to support your medication record and reminders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
