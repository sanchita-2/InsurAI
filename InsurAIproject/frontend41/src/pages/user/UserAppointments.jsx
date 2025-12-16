import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";

import { getCurrentUser } from "../../auth";
import { getMyAppointments } from "../../api";

export default function UserAppointments() {
  const user = getCurrentUser() || { id: 2 };
  const [apps, setApps] = useState([]);

  useEffect(() => { getMyAppointments(user.id).then(setApps).catch(console.error); }, []);

  return (
    <div>
    
      <div className="layout">
        <SidebarUser />
        <main className="content">
          <h2>My Appointments</h2>
          <div className="card">
            <table className="table">
              <thead><tr><th>Date</th><th>Agent</th><th>Message</th><th>Status</th></tr></thead>
              <tbody>{apps.map(a => <tr key={a.id}><td>{a.appointmentTime ? new Date(a.appointmentTime).toLocaleString() : "—"}</td><td>{a.agentName}</td><td>{a.message}</td><td>{a.status}</td></tr>)}</tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
