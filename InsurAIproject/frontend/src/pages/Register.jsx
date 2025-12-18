import React, { useState } from "react";
import { registerUser } from "../api";
import { saveAuth } from "../auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser({ name, email, password, role });
      saveAuth(data);

      
      if (data.user.role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");
    } catch {
      setError("Registration failed");
    }
  }

  return (
    <div className="auth-page">
   
      <div className="auth-top">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>

      <form className="auth-card" onSubmit={submit}>
        
        <h1 className="brand-title">InsureAI</h1>
        <p className="brand-subtitle">Create your account</p>

        {error && <p className="auth-error">{error}</p>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="AGENT">Agent</option>
        </select>

        <button type="submit">Create Account</button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
