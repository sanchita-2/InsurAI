import Navbar from "../components/Navbar";
import SidebarUser from "../components/SidebarUser";
import { Outlet } from "react-router-dom";

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
