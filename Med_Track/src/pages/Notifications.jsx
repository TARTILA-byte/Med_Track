import React from "react";
import "./Notifications.css"; // CSS ফাইলটি ইম্পোর্ট করা হয়েছে

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Medicine Reminder ",
      message: "Time to take Napa Extra (500mg) - Night dose.",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: 2,
      title: "Low Stock Alert ",
      message: "Seclo 20mg is running low. Only 3 capsules left.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Prescription Updated ",
      message: "Dr. Ahmed updated your daily medicine schedule.",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Notifications </h1>

      <div className="notifications-list">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card ${item.unread ? "unread" : "read"}`}
          >
            <div>
              <h3 className="notification-item-title">{item.title}</h3>
              <p className="notification-item-message">{item.message}</p>
            </div>
            <span className="notification-item-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;