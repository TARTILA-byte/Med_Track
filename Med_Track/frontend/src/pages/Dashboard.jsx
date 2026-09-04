import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNotification = () => {
    navigate("/notifications");
  };

  const recentMedicines = [
    { name: "Napa Extra", dose: "500mg", time: "Morning - Night", status: "Active" },
    { name: "Seclo", dose: "20mg", time: "Before Meal", status: "Active" },
    { name: "Ceevit", dose: "250mg", time: "Noon", status: "Completed" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Dashboard</h1>
        <button onClick={handleNotification} className="notification-btn">
          Notifications 
        </button>
      </div>

      {/* Schedule Table */}
      <div className="schedule-card">
        <h3 className="schedule-title">Today's Medicine Schedule</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentMedicines.map((med, index) => (
              <tr key={index}>
                <td className="med-name">{med.name}</td>
                <td className="med-info">{med.dose}</td>
                <td className="med-info">{med.time}</td>
                <td>
                  <span
                    className={`status-badge ${
                      med.status === "Active" ? "active" : "completed"
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;