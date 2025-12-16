import { Link, useLocation } from "react-router-dom";
import "../global.css";

export default function SidebarUser() {
  const loc = useLocation();

  return (
    <aside className="sidebar">
      <h3>User</h3>
      <Link className={loc.pathname.includes("dashboard") ? "active" : ""} to="/user/dashboard">Dashboard</Link>
      <Link className={loc.pathname.includes("appointments") ? "active" : ""} to="/user/appointments">Appointments</Link>
      <Link className={loc.pathname.includes("notifications") ? "active" : ""} to="/user/notifications">Notifications</Link>
    </aside>
  );
}
