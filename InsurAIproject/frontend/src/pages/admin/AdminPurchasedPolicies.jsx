import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/SidebarAdmin";
import { adminGetPurchasedPolicies } from "../../api";

export default function AdminPurchasedPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await adminGetPurchasedPolicies();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to load purchased policies", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <SidebarAdmin />

      <main className="content">
        <h2>Purchased Policies (All Users)</h2>

        {loading ? (
          <p>Loading...</p>
        ) : policies.length === 0 ? (
          <p>No policies purchased yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Policy</th>
                <th>Premium</th>
                <th>Status</th>
                <th>Purchased At</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(p => (
                <tr key={p.id}>
                  <td>{p.userId}</td>
                  <td>{p.policyTitle}</td>
                  <td>₹{p.premium}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.purchasedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
