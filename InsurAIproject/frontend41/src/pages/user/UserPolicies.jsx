import React from "react";
import SidebarUser from "../../components/SidebarUser";
import Navbar from "../../components/Navbar";

export default function UserPolicies() {
  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarUser />
        <main className="content">
          <h2>My Policies</h2>
          <div className="card">
            <p className="text-muted">Policies UI placeholder — integrate policy endpoints as needed.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
