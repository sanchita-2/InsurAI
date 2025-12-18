import React, { useEffect, useState } from "react";
import SidebarAgent from "../../components/SidebarAgent";
import Navbar from "../../components/Navbar";
import { getCurrentUser } from "../../auth";
import { getAgentAppointments } from "../../api";

export default function AgentDashboard() {
  const user = getCurrentUser() || { id: 4, role: "AGENT" };
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAgentAppointments(user.id).then(setAppointments).catch(console.error);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarAgent />
        <main className="content">
          <h1>Agent Dashboard</h1>
          <div className="card">
            <h3>Recent Appointments</h3>
            <table className="table">
              <thead><tr><th>Date</th><th>User</th><th>Message</th><th>Status</th></tr></thead>
              <tbody>{appointments.map(a => <tr key={a.id}><td>{a.appointmentTime ? new Date(a.appointmentTime).toLocaleString() : "—"}</td><td>{a.userName}</td><td>{a.message}</td><td>{a.status}</td></tr>)}</tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
