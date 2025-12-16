import { Link, useLocation } from "react-router-dom";
import "../global.css";

export default function SidebarAdmin() {
  const loc = useLocation();

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Admin Panel</h3>

      <nav className="sidebar-links">
        <Link className={loc.pathname === "/admin/dashboard" ? "active" : ""} to="/admin/dashboard">
          Dashboard
        </Link>
        <Link className={loc.pathname === "/admin/users" ? "active" : ""} to="/admin/users">
          Users
        </Link>
        <Link className={loc.pathname === "/admin/agents" ? "active" : ""} to="/admin/agents">
          Agents
        </Link>
        <Link className={loc.pathname === "/admin/appointments" ? "active" : ""} to="/admin/appointments">
          Appointments
        </Link>
      </nav>
    </aside>
  );
}
