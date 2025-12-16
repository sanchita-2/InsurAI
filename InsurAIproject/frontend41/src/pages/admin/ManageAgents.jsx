import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";

import { adminGetAgents, adminApproveAgent } from "../../api";

export default function ManageAgents() {
  const [agents, setAgents] = useState([]);

  async function load() {
    try { setAgents(await adminGetAgents()); } catch (e) { console.error(e); }
  }

  useEffect(() => { load(); }, []);

  async function change(agentId, approved) {
    try {
      await adminApproveAgent(agentId, approved);
      load();
    } catch (e) { console.error(e); }
  }

  return (
    <div>
      
      <div className="layout">
        <SidebarAdmin />
        <main className="content">
          <h2>Manage Agents</h2>
          <div className="card">
            {agents.map(a => (
              <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #eef2f7" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{a.name}</div>
                  <div className="text-muted">{a.email}</div>
                </div>
                <div>
                  {a.approved !== 1 ? <button className="btn btn-primary" onClick={() => change(a.id, 1)}>Approve</button> : <button className="btn" style={{ background: "#dc2626", color: "#fff" }} onClick={() => change(a.id, 0)}>Reject</button>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
