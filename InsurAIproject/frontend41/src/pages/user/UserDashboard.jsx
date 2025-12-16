import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";
import Navbar from "../../components/Navbar";
import AppointmentForm from "../../components/AppointmentForm";
import AppointmentList from "../../components/AppointmentList";
import { getMyAppointments, getUserNotifications, markNotificationSeen } from "../../api";
import { getCurrentUser } from "../../auth";

export default function UserDashboard() {
  const user = getCurrentUser() || { id: 2, role: "USER" };
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);

  async function loadApps() {
    try { setAppointments(await getMyAppointments(user.id)); } catch (e) { console.error(e); }
  }

  async function loadNotes() {
    try { setNotes(await getUserNotifications(user.id)); } catch (e) { console.error(e); }
  }

  useEffect(() => {
    loadApps();
    loadNotes();
    const iv = setInterval(loadNotes, 20000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarUser />
        <main className="content">
          <h1>User Dashboard</h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
            <div>
              <AppointmentForm onCreated={loadApps} />
              <AppointmentList items={appointments} />
            </div>

            <aside>
              <div className="card">
                <h3>Notifications</h3>
                {notes.length === 0 && <p className="text-muted">No notifications</p>}
                {notes.map(n => (
                  <div key={n.id} style={{ padding: 8, borderBottom: "1px solid #eef2f7" }}>
                    <div style={{ fontWeight: 700 }}>{n.title || "Update"}</div>
                    <div className="text-muted">{n.message || n.body}</div>
                    {!n.seen && <button className="btn" onClick={() => markNotificationSeen(n.id).then(loadNotes)}>Mark seen</button>}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
