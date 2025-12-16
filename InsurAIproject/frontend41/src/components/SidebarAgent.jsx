import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
export default function SidebarAgent() {
  return (
    <aside className="sidebar">
      <h3 style={{ marginTop: 0 }}>Agent</h3>
      <Link to="/agent">Dashboard</Link>
      <Link to="/agent/appointments">Appointments</Link>
      <Link to="/agent/notifications">Notifications</Link>
    </aside>
  );
}
