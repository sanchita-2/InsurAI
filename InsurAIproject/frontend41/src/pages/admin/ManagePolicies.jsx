import React, { useEffect, useState } from "react";

import SidebarAdmin from "../../components/SidebarAdmin";
import "../Home.css";
import {
  adminGetPolicies,
  adminCreatePolicy,
  adminUpdatePolicy,
  adminDeletePolicy
} from "../../api";

export default function ManagePolicies() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    premium: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadPolicies() {
    try {
      const data = await adminGetPolicies();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to load policies", err);
    }
  }

  useEffect(() => {
    loadPolicies();
  }, []);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await adminUpdatePolicy(editingId, {
          ...form,
          premium: Number(form.premium)
        });
      } else {
        await adminCreatePolicy({
          ...form,
          premium: Number(form.premium)
        });
      }

      setForm({ title: "", description: "", premium: "" });
      setEditingId(null);
      await loadPolicies(); // 🔁 live refresh
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save policy");
    } finally {
      setLoading(false);
    }
  }

  function edit(p) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      premium: p.premium
    });
  }

  async function remove(id) {
    if (!window.confirm("Delete this policy?")) return;

    try {
      await adminDeletePolicy(id);
      await loadPolicies(); // 🔁 live refresh
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete policy");
    }
  }

  return (
    <div>
    
      <div className="layout">
        <SidebarAdmin />

        <main className="content">
          <h2>Manage Policies</h2>

          {/* FORM */}
          <div className="card">
            <h3>{editingId ? "Edit Policy" : "Add Policy"}</h3>

            <form onSubmit={submit} className="form">
              <input
                name="title"
                placeholder="Policy Title"
                value={form.title}
                onChange={onChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={onChange}
                required
              />

              <input
                name="premium"
                type="number"
                placeholder="Premium Amount"
                value={form.premium}
                onChange={onChange}
                required
              />

              <button className="btn" disabled={loading}>
                {editingId ? "Update Policy" : "Create Policy"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", description: "", premium: "" });
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* TABLE */}
          <div className="card">
            <h3>Existing Policies</h3>

            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Premium</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>₹{p.premium}</td>
                    <td>{p.description}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => edit(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn danger"
                        onClick={() => remove(p.id)}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {policies.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No policies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
