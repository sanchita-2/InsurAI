// src/pages/user/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getMyAppointments,
  getUserNotifications,
  getUserPolicies,
  cancelUserPolicy,
  renewUserPolicy
} from "../../api";
import AppointmentForm from "../../components/AppointmentForm";

export default function UserDashboard() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
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
      setLoadingAppointments(true);
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
      setLoadingNotifications(true);
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
      setLoadingPolicies(true);
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
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {loggedUser?.name}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ================= APPOINTMENTS ================= */}
      <h2>Book Appointment</h2>
      <AppointmentForm userId={userId} />

      <h2>Your Appointments</h2>
      {loadingAppointments ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {appointments.map(a => (
            <li key={a.id}>
              {a.agentName} | {new Date(a.appointmentTime).toLocaleString()} | {a.status}
            </li>
          ))}
        </ul>
      )}

      {/* ================= POLICIES ================= */}
      <h2>My Policies</h2>

      {loadingPolicies ? (
        <p>Loading policies...</p>
      ) : policies.length === 0 ? (
        <p>No policies purchased yet</p>
      ) : (
        <table border="1" cellPadding="8">
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
                <td>{p.status}</td>
                <td>{new Date(p.purchasedAt).toLocaleDateString()}</td>
                <td>
                  {p.status === "ACTIVE" && (
                    <button onClick={() => handleCancel(p.id)}>
                      Cancel
                    </button>
                  )}
                  {p.status === "CANCELLED" && (
                    <button onClick={() => handleRenew(p.id)}>
                      Renew
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= NOTIFICATIONS ================= */}
      <h2>Notifications</h2>
      {loadingNotifications ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notifications.map(n => (
            <li key={n.id}>
              <strong>{n.title}</strong>: {n.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
