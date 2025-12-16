// src/pages/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import '../global.css';
import Navbar from "../components/Navbar";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });

      // Backend returns: { token, user }
      const { token, user } = res;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
