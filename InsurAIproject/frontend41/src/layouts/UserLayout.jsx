import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarUser from "../components/SidebarUser";
import "../global.css";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <SidebarUser />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
