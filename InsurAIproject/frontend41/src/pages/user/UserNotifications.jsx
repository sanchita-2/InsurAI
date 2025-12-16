import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";
import Navbar from "../../components/Navbar";
import { getCurrentUser } from "../../auth";
import { getUserNotifications, markNotificationSeen } from "../../api";

export default function UserNotifications() {
  const user = getCurrentUser() || { id: 2 };
  const [notes, setNotes] = useState([]);

  async function load() {
    try { setNotes(await getUserNotifications(user.id)); } catch (e) { console.error(e); }
  }

  useEffect(() => {
    load();
    const iv = setInterval(load, 20000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarUser />
        <main className="content">
          <h2>Notifications</h2>
          <div className="card">
            {notes.length === 0 && <p className="text-muted">No notifications</p>}
            {notes.map(n => (
              <div key={n.id} style={{ padding: 8, borderBottom: "1px solid #eef2f7" }}>
                <div style={{ fontWeight: 700 }}>{n.title || "Update"}</div>
                <div className="text-muted">{n.message || n.body}</div>
                {!n.seen && <button className="btn" onClick={() => markNotificationSeen(n.id).then(load)}>Mark seen</button>}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
