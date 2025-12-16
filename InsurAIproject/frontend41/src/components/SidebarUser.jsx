// src/components/UserSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function UserSidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">User Panel</h2>

      <NavLink to="/user/dashboard" className="sidebar-link">
        Dashboard
      </NavLink>

      <NavLink to="/user/appointments" className="sidebar-link">
        Appointments
      </NavLink>
<NavLink to="/user/buy-policies" className="sidebar-link">
  Buy Policies
</NavLink>

<NavLink to="/user/policies" className="sidebar-link">
  My Policies
</NavLink>


      <NavLink to="/user/notifications" className="sidebar-link">
        Notifications
      </NavLink>
    </div>
  );
}
