import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./DoseHistory.css";

function DoseHistory() {
  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.id || user._id || null;
    } catch {
      return null;
    }
  };

  const [history, setHistory] = useState(() => {
    try {
      const userId = getUserId();
      if (!userId) return [];
      const local = localStorage.getItem(`doseHistory_${userId}`);
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoseHistory();
  }, []);

  const fetchDoseHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dose-history");
      if (Array.isArray(res.data)) {
        // Only keep taken doses
        const takenOnly = res.data.filter(
          (item) => !item.status || item.status.toLowerCase() === "taken"
        );

        // Sort descending by date/takenAt
        takenOnly.sort((a, b) => {
          const dateA = new Date(a.takenAt || a.date || 0).getTime();
          const dateB = new Date(b.takenAt || b.date || 0).getTime();
          return dateB - dateA;
        });

        setHistory(takenOnly);

        // Save to user-scoped cache
        const userId = getUserId();
        if (userId) {
          localStorage.setItem(`doseHistory_${userId}`, JSON.stringify(takenOnly));
        }
      }
    } catch (err) {
      console.log("Could not fetch remote dose history, using local cache:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  // Group taken doses by date
  const todayStr = new Date().toISOString().split("T")[0];

  const groupedHistory = history.reduce((groups, item) => {
    const rawDate = item.date || (item.takenAt ? item.takenAt.split("T")[0] : todayStr);
    if (!groups[rawDate]) {
      groups[rawDate] = {
        dateKey: rawDate,
        dateLabel: item.dateLabel || rawDate,
        items: [],
      };
    }
    groups[rawDate].items.push(item);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedHistory).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="dose-history-container">
      <div className="dose-header">
        <div>
          <h1>Dose History</h1>
        </div>
      </div>

      {loading && history.length === 0 ? (
        <div className="empty-state">
          <p>Loading dose history...</p>
        </div>
      ) : sortedDates.length === 0 ? (
        <div className="empty-state">
          <h3>No taken doses recorded yet</h3>
          <p>Mark medicines as taken on your Dashboard to start tracking your dose history.</p>
        </div>
      ) : (
        sortedDates.map((dateKey) => {
          const group = groupedHistory[dateKey];
          const isToday = dateKey === todayStr;
          const count = group.items.length;

          let displayTitle = group.dateLabel;
          if (isToday) {
            displayTitle = `Today - ${group.dateLabel || new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`;
          }

          return (
            <div key={dateKey} className="day-group">
              <div className="day-header">
                <h2>{displayTitle}</h2>
                <span className="day-stats">
                  {count} {count === 1 ? "dose taken" : "doses taken"}
                </span>
              </div>

              <div className="dose-cards-wrapper">
                {group.items.map((item, idx) => {
                  const displayName = item.medicineName || item.name || "Medicine";
                  const displayDosage = item.dosage && !displayName.includes(item.dosage) ? ` ${item.dosage}` : "";
                  const displayTime = item.time || "Logged";

                  return (
                    <div className="dose-card" key={item._id || item.id || idx}>
                      <div className="dose-left">
                        <span className="status-icon taken" title="Taken">
                          ✓
                        </span>
                        <span className="dose-name">
                          {displayName}
                          {displayDosage}
                        </span>
                      </div>
                      <div className="dose-right">
                        <span className="dose-time">{displayTime}</span>
                        <span className="status-badge taken">Taken</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default DoseHistory;
