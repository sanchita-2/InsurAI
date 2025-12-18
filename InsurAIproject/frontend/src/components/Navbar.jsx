import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "../auth";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const user = getCurrentUser();
  const role = user?.role || "GUEST";

  const links = [];

  // Common home
  links.push({ to: "/", label: "Home" });

  if (role === "GUEST") {
    links.push({ to: "/login", label: "Login" });
    links.push({ to: "/register", label: "Register" });
  }

  if (role === "ADMIN") {
    links.push({ to: "/admin/dashboard", label: "Admin Dashboard" });
  }

  if (role === "USER") {
    links.push({ to: "/user/dashboard", label: "Dashboard" });
    links.push({ to: "/user/notifications", label: "Notifications" });
  }

  if (role === "AGENT") {
    links.push({ to: "/agent/dashboard", label: "Dashboard" });
    links.push({ to: "/agent/notifications", label: "Notifications" });
  }

  return (
    <header className="navbar">
      <div className="brand">
        <Link to="/">InsurAI</Link>
      </div>

      <nav className="nav-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={location.pathname === l.to ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nav-right">
        {user && (
          <>
           <span className="user-info">
  {user.role}
  {user.name && user.name !== user.role ? ` • ${user.name}` : ""}
</span>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
