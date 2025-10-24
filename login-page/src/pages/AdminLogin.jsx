import { useState } from "react";
import "./Form.css";

export default function AdminLogin() {
  const [admin, setAdmin] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Admin Login: ${admin.email}`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Admin Email" required
          onChange={(e) => setAdmin({ ...admin, email: e.target.value })} />
        <input type="password" placeholder="Password" required
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
