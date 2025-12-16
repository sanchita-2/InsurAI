import React, { useEffect, useState } from "react";
import SidebarAgent from "../../components/SidebarAgent";
import Navbar from "../../components/Navbar";
import { getCurrentUser } from "../../auth";
import { getAgentAppointments, updateAppointmentStatus } from "../../api";

export default function AgentAppointments() {
  const user = getCurrentUser() || { id: 4 };
  const [apps, setApps] = useState([]);

  async function load() { setApps(await getAgentAppointments(user.id)); }

  useEffect(() => { load(); }, []);

  async function change(id, status) {
    try { await updateAppointmentStatus(id, status); load(); } catch (e) { console.error(e); }
  }

  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarAgent />
        <main className="content">
          <h2>Appointments</h2>
          <div className="card">
            <table className="table">
              <thead><tr><th>Date</th><th>User</th><th>Message</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {apps.map(a => (
                  <tr key={a.id}>
                    <td>{a.appointmentTime ? new Date(a.appointmentTime).toLocaleString() : "—"}</td>
                    <td>{a.userName}</td>
                    <td>{a.message}</td>
                    <td>{a.status}</td>
                    <td>{a.status === "PENDING" ? <>
                      <button className="btn" onClick={() => change(a.id, "APPROVED")}>Approve</button>
                      <button className="btn" style={{ marginLeft: 8, background:"#dc2626", color:"#fff" }} onClick={() => change(a.id, "REJECTED")}>Reject</button>
                    </> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
