// src/pages/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import '../global.css';
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser({ name, email, password, role });

      const { token, user } = res;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to register user");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="AGENT">Agent</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
