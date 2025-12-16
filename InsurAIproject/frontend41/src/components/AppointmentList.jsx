import React, { useEffect, useState } from "react";
import { apiGet, apiPut } from "../api";
import "./AppointmentList.css";

export default function AppointmentList({ mode, id }) {
 
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      let url = "";
      if (mode === "USER") url = `/user/appointments/${id}`;
      else if (mode === "AGENT") url = `/agent/appointments/${id}`;
      else url = `/admin/appointments`;

      const data = await apiGet(url);
      setList(data);
    } catch (e) {
      console.error("Error loading appointments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (appId, status) => {
    try {
      await apiPut(`/agent/appointments/${appId}/status?status=${status}`);
      load();
    } catch (e) {
      console.error("Update failed:", e);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="appointment-container">
      <h2 className="title">Appointments</h2>

      {list.length === 0 ? (
        <p className="empty">No appointments found.</p>
      ) : (
        <div className="appointment-list">
          {list.map((a) => (
            <div key={a.id} className="appointment-card">
              <p><strong>Message:</strong> {a.message}</p>

              <p><strong>Date:</strong> 
                 {new Date(a.appointmentTime).toLocaleString()}
              </p>

              {mode !== "USER" && (
                <p><strong>User:</strong> {a.userId}</p>
              )}

              {mode !== "AGENT" && (
                <p><strong>Agent:</strong> {a.agentId}</p>
              )}

              <p className={`status ${a.status.toLowerCase()}`}>
                Status: {a.status}
              </p>

              {mode === "AGENT" && a.status === "PENDING" && (
                <div className="actions">
                  <button
                    className="approve"
                    onClick={() => handleStatus(a.id, "APPROVED")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleStatus(a.id, "REJECTED")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
