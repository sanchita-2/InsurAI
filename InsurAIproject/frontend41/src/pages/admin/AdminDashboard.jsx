import React, { useEffect, useState } from "react";

import SidebarAdmin from "../../components/SidebarAdmin";
import "../../global.css";

import {
  adminGetUsers,
  adminGetAgents,
  adminGetAppointments
} from "../../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    agents: 0,
    approvedAgents: 0,
    appointments: 0
  });
useEffect(() => {
  async function load() {
    try {
      const [users, agents, apps] = await Promise.all([
        adminGetUsers(),
        adminGetAgents(),
        adminGetAppointments()
      ]);

      console.log("USERS:", users);
      console.log("AGENTS:", agents);
      console.log("APPS:", apps);

      setStats({
        users: users.length,
        agents: agents.length,
        approvedAgents: agents.filter(a => a.approved === 1).length,
        appointments: apps.length
      });
    } catch (err) {
      console.error("Dashboard load failed:", err);
    }
  }
  load();
}, []);


  return (
    <>
      
      <div className="layout">
        

        <main className="content">
        

          <div className="dashboard-grid">
            <div className="dashboard-card blue">
              <h3>Total Users</h3>
              <p>{stats.users}</p>
            </div>

            <div className="dashboard-card green">
              <h3>Approved Agents</h3>
              <p>{stats.approvedAgents}</p>
            </div>

            <div className="dashboard-card yellow">
              <h3>Total Agents</h3>
              <p>{stats.agents}</p>
            </div>

            <div className="dashboard-card purple">
              <h3>Appointments</h3>
              <p>{stats.appointments}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
