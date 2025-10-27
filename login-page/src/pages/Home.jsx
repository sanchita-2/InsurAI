import heroImg from "../assets/hero.jpg";
import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState({ name: "", email: "", coverage: "", amount: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Quote requested for ${quote.name} (${quote.coverage})`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="overlay">
          <h1 className="fade-in">Protect What Matters Most</h1>
          <p className="fade-in-delay">
            Affordable, trusted, and smart insurance solutions for your peace of mind.
          </p>
          <a href="/register" className="btn-primary slide-up">Get Started</a>
        </div>
      </header>

      {/* Services Section */}
      <section className="services">
        <h2>Our Insurance Plans</h2>
        <div className="service-grid">
          <div className="service-card fade-card">
            <h3>Life Insurance</h3>
            <p>Secure your family’s future with long-term coverage and benefits.</p>
          </div>
          <div className="service-card fade-card">
            <h3>Health Insurance</h3>
            <p>Comprehensive health plans to cover emergencies and regular care.</p>
          </div>
          <div className="service-card fade-card">
            <h3>Vehicle & Home</h3>
            <p>Reliable protection for your most valuable assets.</p>
          </div>
        </div>
      </section>

      {/* Get a Quote Section */}
      <section className="quote-section">
        <h2>Get a Free Quote</h2>
        <form onSubmit={handleSubmit} className="quote-form">
          <input
            type="text"
            placeholder="Your Name"
            required
            onChange={(e) => setQuote({ ...quote, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setQuote({ ...quote, email: e.target.value })}
          />
          <select
            required
            onChange={(e) => setQuote({ ...quote, coverage: e.target.value })}
          >
            <option value="">Select Coverage Type</option>
            <option>Life Insurance</option>
            <option>Health Insurance</option>
            <option>Vehicle Insurance</option>
            <option>Home Insurance</option>
          </select>
          <input
            type="number"
            placeholder="Coverage Amount (₹)"
            required
            onChange={(e) => setQuote({ ...quote, amount: e.target.value })}
          />
          <button type="submit">Request Quote</button>
        </form>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial fade-card">
            <p>“InsureAI made it super easy to find affordable life insurance. Great service!”</p>
            <h4>- Sanchita </h4>
          </div>
          <div className="testimonial fade-card">
            <p>“Quick, reliable and transparent. I trust them for all my family’s policies.”</p>
            <h4>- Sneha Patel</h4>
          </div>
          <div className="testimonial fade-card">
            <p>“Their health plans helped me during a tough time. Highly recommended!”</p>
            <h4>- Arjun Mehta</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 InsurePro. Designed with ❤️ for your safety.</p>
      </footer>
    </div>
  );
}
