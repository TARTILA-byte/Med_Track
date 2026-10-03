import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    totalMedicines: 0,
    todayTotal: 0,
    todayMedicines: [],
  });

  // 🔴 ১. LocalStorage থেকে প্রাথমিক ডাটা নেওয়া (যাতে পেজ রিফ্রেশ বা লগআউটেও না মোছে)
  const [takenList, setTakenList] = useState(() => {
    const savedTaken = localStorage.getItem("takenMedicines");
    return savedTaken ? JSON.parse(savedTaken) : {};
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard");
      setData(response.data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      setError("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 ২. Mark as Taken বাটনে ক্লিক করলে LocalStorage-এ আপডেট করা এবং Dose History-তে পাঠানো
  const handleMarkAsTaken = async (id) => {
    setTakenList((prev) => {
      const updatedList = { ...prev, [id]: true };
      localStorage.setItem("takenMedicines", JSON.stringify(updatedList)); // LocalStorage-এ সেভ
      return updatedList;
    });

    try {
      const med = data.todayMedicines.find((m) => m._id === id);
      if (med) {
        const now = new Date();
        const dateKey = now.toISOString().split("T")[0];
        const dateLabel = now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const medNameWithDosage = med.dosage
          ? `${med.name} ${med.dosage}`
          : med.name;
        const timeStr =
          med.time ||
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // ১. LocalStorage doseHistory তে সেভ করা
        const savedHistory = JSON.parse(
          localStorage.getItem("doseHistory") || "[]"
        );
        const alreadyExists = savedHistory.some(
          (item) =>
            (item.medicineId === med._id || item.name === medNameWithDosage) &&
            item.date === dateKey &&
            item.status === "taken"
        );

        if (!alreadyExists) {
          const newEntry = {
            id: `${med._id}-${Date.now()}`,
            medicineId: med._id,
            name: medNameWithDosage,
            dosage: med.dosage || "",
            time: timeStr,
            status: "taken",
            date: dateKey,
            dateLabel: dateLabel,
            takenAt: now.toISOString(),
          };
          localStorage.setItem(
            "doseHistory",
            JSON.stringify([newEntry, ...savedHistory])
          );
        }

        // ২. Backend API তে সেভ করা
        api
          .post("/dose-history", {
            medicineId: med._id,
            medicineName: medNameWithDosage,
            dosage: med.dosage || "",
            time: timeStr,
            status: "taken",
            date: dateKey,
            dateLabel: dateLabel,
          })
          .catch((err) => {
            console.log("Dose history backend sync error:", err?.message);
          });
      }
    } catch (err) {
      console.error("Failed to record dose history:", err);
    }
  };

  const handleNotification = () => {
    navigate("/notifications");
  };

  const takenCount = Object.keys(takenList).length;
  const pendingCount = Math.max(0, data.todayTotal - takenCount);

  if (loading)
    return (
      <div className="page">
        <p>Loading Dashboard...</p>
      </div>
    );
  if (error)
    return (
      <div className="page">
        <p className="error-message">{error}</p>
      </div>
    );

  return (
    <div className="page dashboard-container">
      {/* Header section with Welcome Banner & Notification Icon */}
      <div className="welcome-banner">
        <div>
          <h2>Welcome back! 👋</h2>
          <p>Keep track of your medicines and stay healthy every day.</p>
        </div>

        {/* Notification Button */}
        <button
          className="notification-btn"
          onClick={handleNotification}
          title="View Notifications"
        >
          🔔 <span className="notification-badge"></span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>{data.todayTotal}</h3>
          <p>Today's Total Doses</p>
        </div>
        <div className="stat-card green">
          <h3>{takenCount}</h3>
          <p>Taken</p>
        </div>
        <div className="stat-card yellow">
          <h3>{pendingCount}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card purple">
          <h3>{data.totalMedicines}</h3>
          <p>Total Medicines Enrolled</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content-grid">
        {/* Today's Schedule */}
        <div className="section-card schedule-section">
          <div className="section-header">
            <h3>Today's Schedule</h3>
            <Link to="/all-medicines" className="add-btn-link">
              + Add New
            </Link>
          </div>

          {data.todayMedicines.length === 0 ? (
            <p className="empty-text">No medicines scheduled for today.</p>
          ) : (
            <div className="schedule-list">
              {data.todayMedicines.map((med) => {
                const isTaken = !!takenList[med._id];
                return (
                  <div
                    key={med._id}
                    className={`schedule-item ${isTaken ? "completed" : ""}`}
                  >
                    <div className="time-badge">
                      ⏰ {med.time || "12:00 PM"}
                    </div>
                    <div className="med-info">
                      <h4>
                        {med.name} ({med.dosage})
                      </h4>
                      <p>
                        {med.frequency} • {med.foodTiming || "After Food"}
                      </p>
                    </div>
                    <div className="action-area">
                      {isTaken ? (
                        <span className="taken-badge">Taken ✅</span>
                      ) : (
                        <button
                          className="take-btn"
                          onClick={() => handleMarkAsTaken(med._id)}
                        >
                          Mark as Taken
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
