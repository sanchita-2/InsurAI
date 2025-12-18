// src/components/AppointmentForm.jsx
import React, { useEffect, useState } from "react";
import { bookAppointment, getApprovedAgents } from "../api";

export default function AppointmentForm({ userId }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [message, setMessage] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getApprovedAgents();
        setAgents(data);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
        setError("Failed to fetch agents.");
      }
    };
    fetchAgents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedAgentId) {
      setError("Please select an agent.");
      return;
    }

    try {
      await bookAppointment({
        userId,
        agentId: selectedAgentId,
        message,
        appointmentTime: appointmentTime ? new Date(appointmentTime).toISOString() : null,
      });
      setSuccess("Appointment booked successfully!");
      setMessage("");
      setAppointmentTime("");
      setSelectedAgentId("");
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError("Failed to book appointment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div>
        <label>Agent:</label>
        <select
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          required
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
      </div>

      <div>
        <label>Appointment Time:</label>
        <input
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
        />
      </div>

      <button type="submit">Book Appointment</button>
    </form>
  );
}
