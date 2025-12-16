import React, { useEffect, useState } from "react";
import { getUserNotifications, markNotificationSeen, markAllUserSeen } from "../services/notificationApi";

export default function UserNotifications({ userId }) {
  const [notifications, setNotifications] = useState([]);

  
  useEffect(() => {
    if (!userId) return;

    loadNotifications();
    const interval = setInterval(loadNotifications, 20000); 
    return () => clearInterval(interval);
  }, [userId]);

  const loadNotifications = async () => {
    try {
      const data = await getUserNotifications(userId);
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleMarkSeen = async (id) => {
    try {
      await markNotificationSeen(id);
      loadNotifications();
    } catch (err) {
      console.error("Failed to mark notification as seen", err);
    }
  };

  const handleMarkAllSeen = async () => {
    try {
      await markAllUserSeen(userId);
      loadNotifications();
    } catch (err) {
      console.error("Failed to mark all notifications as seen", err);
    }
  };

  return (
    <div className="notifications-box">
      <h3>
        Notifications
        <button onClick={handleMarkAllSeen} style={{ marginLeft: "10px", fontSize: "12px" }}>
          Mark All Seen
        </button>
      </h3>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            padding: "8px",
            marginBottom: "6px",
            border: "1px solid #ccc",
            backgroundColor: n.seen ? "#f9f9f9" : "#e6f7ff",
            borderRadius: "4px",
          }}
        >
          <p>{n.message}</p>
          <small>{new Date(n.createdAt).toLocaleString()}</small>
          {!n.seen && (
            <button
              onClick={() => handleMarkSeen(n.id)}
              style={{ marginLeft: "10px", fontSize: "12px" }}
            >
              Mark Seen
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
