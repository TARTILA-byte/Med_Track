import React, { useState, useEffect } from "react";
import api from "../api/api"; // Axios Instance
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");

      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id, isRead) => {
    if (isRead) return;

    try {
      const response = await api.patch(`/notifications/${id}/read`);

      if (response.data.success) {
        setNotifications((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isRead: true } : item
          )
        );
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  if (loading) return <div className="notifications-container">Loading notifications...</div>;
  if (error) return <div className="notifications-container error">{error}</div>;

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Notifications</h1>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => handleMarkAsRead(item._id, item.isRead)}
              className={`notification-card ${!item.isRead ? "unread" : "read"}`}
              style={{ cursor: item.isRead ? "default" : "pointer" }}
            >
              <div>
                <h3 className="notification-item-title">{item.title}</h3>
                <p className="notification-item-message">{item.message}</p>
              </div>
              <span className="notification-item-time">
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;