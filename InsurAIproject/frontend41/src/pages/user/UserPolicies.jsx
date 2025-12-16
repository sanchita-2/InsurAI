import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";
import {
  getUserPolicies,
  cancelUserPolicy,
  renewUserPolicy
} from "../../api";

export default function UserPolicies() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPolicies() {
    try {
      setLoading(true);
      const data = await getUserPolicies(userId);
      setPolicies(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load policies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) loadPolicies();
  }, [userId]);

  async function cancelPolicy(id) {
    if (!window.confirm("Cancel this policy?")) return;
    await cancelUserPolicy(id);
    loadPolicies();
  }

  async function renewPolicy(id) {
    await renewUserPolicy(id);
    loadPolicies();
  }

  return (
    <div className="layout">
      <SidebarUser />

      <main className="content">
        <h2>My Policies</h2>

        {loading && <p>Loading policies...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && policies.length === 0 && (
          <p>No policies purchased yet.</p>
        )}

        {policies.map((p) => (
          <div className="card" key={p.id} style={{ marginBottom: 16 }}>
            <h3>{p.policyTitle}</h3>

            <p>
              <strong>Premium:</strong> ₹{p.premium}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: p.status === "ACTIVE" ? "green" : "red",
                  fontWeight: "bold"
                }}
              >
                {p.status}
              </span>
            </p>

            <p>
              <strong>Purchased On:</strong>{" "}
              {new Date(p.purchasedAt).toLocaleDateString()}
            </p>

            {p.status === "ACTIVE" ? (
              <button
                className="btn danger"
                onClick={() => cancelPolicy(p.id)}
              >
                Cancel Policy
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => renewPolicy(p.id)}
              >
                Renew Policy
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
