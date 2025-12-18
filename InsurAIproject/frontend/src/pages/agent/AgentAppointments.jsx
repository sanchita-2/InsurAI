import React, { useEffect, useState } from "react";
import SidebarAgent from "../../components/SidebarAgent";
import Navbar from "../../components/Navbar";
import { getCurrentUser } from "../../auth";
import { getAgentAppointments, updateAppointmentStatus } from "../../api";

export default function AgentAppointments() {
  const user = getCurrentUser();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛑 Guard: not logged in
  if (!user) {
    return <div>Please login as agent.</div>;
  }

  async function load() {
    try {
      setLoading(true);
      const data = await getAgentAppointments(user.id);
      setApps(data || []);
    } catch (e) {
      console.error("Failed to load appointments", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [user.id]); // ✅ proper dependency

  async function change(id, status) {
    try {
      await updateAppointmentStatus(id, status);
      await load(); // refresh list
    } catch (e) {
      console.error("Status update failed", e);
      alert("Failed to update appointment status");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="layout">
        <SidebarAgent />
        <main className="content">
          <h2>Appointments</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    apps.map((a) => (
                      <tr key={a.id}>
                        <td>
                          {a.appointmentTime
                            ? new Date(a.appointmentTime).toLocaleString()
                            : "—"}
                        </td>
                        <td>{a.userName || "—"}</td>
                        <td>{a.message || "—"}</td>
                        <td>{a.status}</td>
                        <td>
                          {a.status === "PENDING" ? (
                            <>
                              <button
                                className="btn"
                                onClick={() => change(a.id, "APPROVED")}
                              >
                                Approve
                              </button>
                              <button
                                className="btn"
                                style={{
                                  marginLeft: 8,
                                  background: "#dc2626",
                                  color: "#fff",
                                }}
                                onClick={() => change(a.id, "REJECTED")}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
