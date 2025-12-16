import { useState } from "react";

import axios from "axios";

function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", { email, password });


      if (res.data === "Admin Login Success") {
        setMessage("✅ Welcome Admin!");
      } else {
        setMessage("❌ Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server");
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />

        <button type="submit">Login as Admin</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Admin;
