import React, { useState } from "react";
import { loginUser } from "../api";
import { saveAuth } from "../auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  
  const successMessage = location.state?.message;

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });

      
      saveAuth(data);

      if (data.user.role === "ADMIN") navigate("/admin/dashboard");
      else if (data.user.role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-top">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>

      <form className="auth-card" onSubmit={submit}>
        <h1 className="brand-title">InsureAI</h1>
        <p className="brand-subtitle">Login to your account</p>

        {successMessage && (
          <p className="auth-success">{successMessage}</p>
        )}

        {error && <p className="auth-error">{error}</p>}

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

        <button type="submit">Login</button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
