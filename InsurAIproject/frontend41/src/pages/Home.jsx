import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import heroImg from "./hero.jpg";
import { getPolicies, buyPolicy, getUserPolicies } from "../api";
import { getCurrentUser } from "../auth";
import { getDashboardRoute } from "../redirect";
export default function Home() {
  const [policies, setPolicies] = useState([]);
  const [purchasedPolicyIds, setPurchasedPolicyIds] = useState([]);

  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    loadPolicies();
    if (user?.role === "USER") {
      loadUserPolicies();
    }
  }, []);

  
  async function loadPolicies() {
    try {
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      console.error("Failed to load policies", err);
    }
  }

  /* ================= LOAD USER PURCHASED POLICIES ================= */
  async function loadUserPolicies() {
    try {
      const data = await getUserPolicies(user.id);
      const ids = data.map(p => p.policyId);
      setPurchasedPolicyIds(ids);
    } catch (err) {
      console.error("Failed to load user policies", err);
    }
  }

  /* ================= BUY POLICY ================= */
  async function handleBuy(policyId) {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await buyPolicy(user.id, policyId);
      alert("Policy purchased successfully");
      loadUserPolicies(); // refresh state
    } catch (err) {
      console.error(err);
      alert("Failed to purchase policy");
    }
  }

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Insurance Made <span>Simple</span> with AI
          </h1>
          <p>
            Buy smart insurance policies, get expert guidance, and manage everything
            in one secure platform.
          </p>

          <div className="hero-actions">
            {!user ? (
              <>
                <Link to="/register" className="btn-primary">Get Started</Link>
                <Link to="/login" className="btn-outline">Login</Link>
              </>
            ) : (
              <button
  className="btn-primary"
  onClick={() => navigate(getDashboardRoute(user.role))}
>
  Go to Dashboard
</button>
            )}
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Insurance Banner" />
        </div>
      </section>

      {/* ================= POLICIES SECTION ================= */}
      <section className="policies">
        <h2>Our Insurance Policies</h2>
        <p className="subtitle">
          Choose from a wide range of insurance plans designed for real-world needs.
        </p>

        <div className="policy-grid">
          {policies.map(p => {
            const alreadyBought = purchasedPolicyIds.includes(p.id);

            return (
              <div className="policy-card" key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <strong>₹{p.premium}</strong>

                <button
                  className="btn-primary"
                  disabled={alreadyBought}
                  onClick={() => handleBuy(p.id)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: alreadyBought ? "#ccc" : ""
                  }}
                >
                  {alreadyBought ? "Already Purchased" : "Buy Policy"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="why-us">
        <h2>Why Choose InsureAI?</h2>

        <div className="features">
          <div className="feature">
            <h4>AI-Driven Recommendations</h4>
            <p>Get the best policy suggestions tailored to your needs.</p>
          </div>

          <div className="feature">
            <h4>Trusted Agents</h4>
            <p>Connect with verified insurance agents for expert guidance.</p>
          </div>

          <div className="feature">
            <h4>Secure & Transparent</h4>
            <p>Your data and transactions are fully secure.</p>
          </div>

          <div className="feature">
            <h4>Easy Policy Management</h4>
            <p>Buy, track, and manage policies from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Ready to Protect What Matters Most?</h2>
        <p>Join thousands of users who trust InsureAI.</p>
        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-content">
          <h3>InsureAI</h3>
          <p>Smart insurance solutions powered by AI.</p>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} InsureAI. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
