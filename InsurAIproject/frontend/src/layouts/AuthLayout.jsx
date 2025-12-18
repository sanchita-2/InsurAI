import React from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout({ title, children }) {
  return (
    <div className="auth-container">
      <header className="auth-header">
        <Link to="/" className="logo">InsureAI</Link>
        <Link to="/" className="back-link">← Back to Home</Link>
      </header>

      <div className="auth-card">
        <h2>{title}</h2>
        {children}
      </div>

      <footer className="auth-footer">
        © {new Date().getFullYear()} InsureAI. All rights reserved.
      </footer>
    </div>
  );
}
