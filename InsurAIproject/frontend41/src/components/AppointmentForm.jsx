import { useEffect, useState } from "react";
import { getApprovedAgents, bookAppointment} from "../api";

export default function AppointmentForm({ onCreated }) {
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    getApprovedAgents()
      .then(setAgents)
      .catch(console.error);
  }, []);

  return (
    <div className="card">
      <h3>Book Appointment</h3>

      <select value={agentId} onChange={e => setAgentId(e.target.value)}>
        <option value="">Select Agent</option>
        {agents.map(a => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

    </div>
  );
}
