import { useState } from "react";
import "./Form.css";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered: ${user.name}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" required
          onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input type="email" placeholder="Email" required
          onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password" required
          onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <input type="tel" placeholder="Phone" required
          onChange={(e) => setUser({ ...user, phone: e.target.value })} />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}
