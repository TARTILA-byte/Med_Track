import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminProfile.css";
import api from "../../api/api";
function AdminProfile() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || "Administrator",
          email: parsed.email || "admin@medtrack.org",
          role: parsed.role || "Clinical Administrator",
          department: parsed.department || "Drug Information & Formulary",
          staffId: parsed.id
            ? "ADM-" + parsed.id.slice(-4).toUpperCase()
            : parsed.staffId || "ADM-9042",
          occupasion: parsed.occupasion || "Occupasion",
        };
      } catch (e) {
        console.error("Error parsing admin data", e);
      }
    }
    return {
      name: "Dr. Eleanor Vance",
      email: "eleanor.vance@medtrack.org",
      role: "Lead Clinical Pharmacist",
      department: "Drug Information & Reference Formulary",
      staffId: "ADM-9042",
      occupasion: "Pharmacist",
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...admin });
  const [drugCount, setDrugCount] = useState(0);

  useEffect(() => {
    // Fetch count of drugs in the reference database
    api.get("/druginfo")
      .then((data) => {
        if (Array.isArray(data)) {
          setDrugCount(data.length);
        }
      })
      .catch((err) => console.log("Could not load drug count:", err));
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setAdmin(editForm);
    localStorage.setItem("adminUser", JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleLogout = async () => {
  try {
    
    await api.post("/admin/logout",  );
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setAdmin(null); 
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    
    window.location.href = "/admin/login";
  
  }
};

  return (
    <div className="admin-profile-container">
      <header className="admin-profile-header">
        <h1>Administrator Profile</h1>
        <p>Manage your clinical staff credentials, portal privileges, and system settings.</p>
      </header>

      <div className="admin-profile-layout">
        {/* Left Column: Admin Identity & Details */}
        <div className="admin-profile-main">
          <div className="admin-card">
            <div className="admin-identity">
              <div className="admin-avatar">{admin.name.charAt(0)}</div>
              <div className="admin-identity-info">
                <div className="identity-title-row">
                  <h2>{admin.name}</h2>
                  <span className="status-badge verified">Verified Admin</span>
                </div>
                <p className="admin-email">{admin.email}</p>
                <span className="role-tag">{admin.role}</span>
              </div>
            </div>

            <div className="admin-divider" />

            {!isEditing ? (
              <div className="admin-details-section">
                <div className="details-header-row">
                  <h3>Information</h3>
                  <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                    Edit Details
                  </button>
                </div>

                <div className="admin-details-grid">
                  <div className="detail-box">
                    <span className="detail-label">STAFF ID</span>
                    <span className="detail-value">{admin.staffId}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">DEPARTMENT</span>
                    <span className="detail-value">{admin.department}</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label">ACCESS LEVEL</span>
                    <span className="detail-value">Tier 1 (Clinical Monograph Publisher)</span>
                  </div>
                  <div className="detail-box">
                    <span className="detail-label"> Occupation </span>
                    <span className="detail-value">{admin.occupasion}</span>
                  </div>
                </div>
              </div>
            ) : (
              <form className="admin-edit-form" onSubmit={handleSaveProfile}>
                <h3>Update Profile</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role / Position</label>
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    required
                  />
                </div>
                <div className="edit-buttons">
                  <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="admin-card quick-actions-card">
            <h3>Quick Admin Actions</h3>
            <div className="actions-buttons-row">
              <Link to="/admin/add-drug-reference" className="btn-action-primary">
                + Add New Drug Reference
              </Link>
              <Link to="/drug-info" className="btn-action-secondary">
                View Public Drug Reference Catalog →
              </Link>
            </div>
          </div>

          {/* Logout Row */}
          <div className="admin-logout-box">
            <div>
              <h4>Sign out of Admin Portal</h4>
              <p>End your administrative session to protect sensitive drug databases.</p>
            </div>
            <button className="btn-danger-logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        {/* Right Column: Statistics & System Scope */}
        <div className="admin-profile-sidebar">
          <div className="admin-card stat-card">
            <span className="sidebar-label">DATABASE STATS</span>
            <div className="stat-number">{drugCount}</div>
            <p className="stat-desc">Published Clinical Drug Monographs</p>
            <div className="admin-divider" />
            <div className="status-item">
              <span>Database Connection:</span>
              <span className="text-green font-semibold">Online & Synced</span>
            </div>
          </div>

          <div className="admin-card privileges-card">
            <span className="sidebar-label">ADMIN PRIVILEGES</span>
            <ul className="privilege-list">
              <li>✓ Publish & edit clinical monographs</li>
              <li>✓ Manage pharmacological mechanisms</li>
              <li>✓ Drug interactions & warnings indexing</li>
              <li>✓ System administration access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
