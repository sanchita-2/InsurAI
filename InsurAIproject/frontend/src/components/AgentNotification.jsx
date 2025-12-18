import React, { useEffect, useState } from "react";
import { getAgentNotifications, markNotificationSeen, markAllAgentSeen } from "../services/notificationApi";

export default function AgentNotifications({ agentId }) {
  const [notifications, setNotifications] = useState([]);

  // Load notifications on mount and every 20s
  useEffect(() => {
    if (!agentId) return;

    loadNotifications();
    const interval = setInterval(loadNotifications, 20000); // auto-refresh 20s
    return () => clearInterval(interval);
  }, [agentId]);

  const loadNotifications = async () => {
    try {
      const data = await getAgentNotifications(agentId);
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
      await markAllAgentSeen(agentId);
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
            backgroundColor: n.seen ? "#f9f9f9" : "#fff3e6",
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
