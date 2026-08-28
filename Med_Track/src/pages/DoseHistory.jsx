import React from "react";
import "./DoseHistory.css";

const doseHistory = [
  {
    date: "Sunday, August 2",
    stats: "4/5 taken",
    doses: [
      { id: 1, name: "Omeprazole 20mg", time: "07:30", status: "missed" },
      { id: 2, name: "Metformin 500mg", time: "08:00", status: "taken" },
      { id: 3, name: "Vitamin D3 2000 IU", time: "08:00", status: "taken" },
      { id: 4, name: "Lisinopril 10mg", time: "09:00", status: "taken" },
      { id: 5, name: "Metformin 500mg", time: "20:00", status: "taken" },
    ],
  },
  {
    date: "Saturday, August 1",
    stats: "6/6 taken",
    doses: [
      { id: 6, name: "Omeprazole 20mg", time: "07:30", status: "taken" },
      { id: 7, name: "Metformin 500mg", time: "08:00", status: "taken" },
      { id: 8, name: "Vitamin D3 2000 IU", time: "08:00", status: "taken" },
    ],
  },
];

function DoseHistory() {
  return (
    <div className="dose-history-container">
      {/* Page Header with Key Stats */}
      <div className="dose-header">
        <div>
          <h1>Dose History</h1>
          <p className="subtitle">3-day medication adherence log.</p>
        </div>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-value">87%</span>
            <span className="stat-label">adherence rate</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">13/15</span>
            <span className="stat-label">doses taken</span>
          </div>
          <div className="stat-box missed">
            <span className="stat-value">2</span>
            <span className="stat-label">missed</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="adherence-card">
        <div className="card-header">
          <h3>Overall Adherence — Last 3 Days</h3>
          <span className="card-sub-text">13 taken · 2 missed</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: "87%" }}></div>
        </div>
        <div className="progress-labels">
          <span>0%</span>
          <span>87% taken</span>
          <span>100%</span>
        </div>
      </div>

      {/* Logs by Day */}
      {doseHistory.map((dayGroup, index) => (
        <div key={index} className="day-group">
          <div className="day-header">
            <h2>{dayGroup.date}</h2>
            <span className="day-stats">{dayGroup.stats}</span>
          </div>
          <div className="dose-cards-wrapper">
            {dayGroup.doses.map((item) => (
              <div key={item.id} className="dose-card">
                <div className="dose-left">
                  <span className={`status-icon ${item.status}`}>
                    {item.status === "taken" ? "✓" : "✕"}
                  </span>
                  <span className="dose-name">{item.name}</span>
                </div>
                <div className="dose-right">
                  <span className="dose-time">{item.time}</span>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoseHistory;
