import React, { useEffect, useState } from "react";
import {
  getMyAppointments,
  getUserNotifications,
  getUserPolicies,
  cancelUserPolicy,
  renewUserPolicy
} from "../../api";
import AppointmentForm from "../../components/AppointmentForm";
import { getCurrentUser } from "../../auth";
import "./UserDashboard.css";

export default function UserDashboard() {
  const loggedUser = getCurrentUser();
  const userId = loggedUser?.id;

  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [policies, setPolicies] = useState([]);

  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [loadingPolicies, setLoadingPolicies] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      return;
    }
    fetchAppointments();
    fetchNotifications();
    fetchPolicies();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments(userId);
      setAppointments(data);
    } catch {
      setError("Failed to fetch appointments");
    } finally {
      setLoadingAppointments(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getUserNotifications(userId);
      setNotifications(data);
    } catch {
      setError("Failed to fetch notifications");
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchPolicies = async () => {
    try {
      const data = await getUserPolicies(userId);
      setPolicies(data);
    } catch {
      setError("Failed to fetch policies");
    } finally {
      setLoadingPolicies(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this policy?")) return;
    await cancelUserPolicy(id);
    fetchPolicies();
  };

  const handleRenew = async (id) => {
    await renewUserPolicy(id);
    fetchPolicies();
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome, {loggedUser?.name}</h1>
      {error && <p className="error">{error}</p>}

      {/* APPOINTMENTS */}
      <section className="card">
        <h2>Book Appointment</h2>
        <AppointmentForm userId={userId} />
      </section>

      <section className="card">
        <h2>Your Appointments</h2>
        {loadingAppointments ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="muted">No appointments found</p>
        ) : (
          <ul className="list">
            {appointments.map(a => (
              <li key={a.id}>
                <strong>{a.agentName}</strong> —{" "}
                {new Date(a.appointmentTime).toLocaleString()} |{" "}
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* POLICIES */}
      <section className="card">
        <h2>My Policies</h2>

        {loadingPolicies ? (
          <p>Loading policies...</p>
        ) : policies.length === 0 ? (
          <p className="muted">No policies purchased yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Policy</th>
                <th>Premium</th>
                <th>Status</th>
                <th>Purchased</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(p => (
                <tr key={p.id}>
                  <td>{p.policyTitle}</td>
                  <td>₹{p.premium}</td>
                  <td>
                    <span className={`badge ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{new Date(p.purchasedAt).toLocaleDateString()}</td>
                  <td>
                    {p.status === "ACTIVE" && (
                      <button className="btn danger" onClick={() => handleCancel(p.id)}>
                        Cancel
                      </button>
                    )}
                    {p.status === "CANCELLED" && (
                      <button className="btn success" onClick={() => handleRenew(p.id)}>
                        Renew
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* NOTIFICATIONS */}
      <section className="card">
        <h2>Notifications</h2>
        {loadingNotifications ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="muted">No notifications</p>
        ) : (
          <ul className="list">
            {notifications.map(n => (
              <li key={n.id}>
                <strong>{n.title}</strong> — {n.body}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
