import Navbar from "../components/Navbar";
import SidebarAdmin from "../components/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <SidebarAdmin />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
