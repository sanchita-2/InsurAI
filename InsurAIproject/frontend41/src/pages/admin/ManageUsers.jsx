import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { adminGetUsers } from "../../api";
import SidebarAdmin from "../../components/SidebarAdmin.jsx";
export default function ManageUsers(){
  const [users,setUsers] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    try{ setUsers(await adminGetUsers()); } catch(e){ console.error(e); }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Manage Users</h2>
        <div className="card">
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Approved</th></tr></thead>
            <tbody>{users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.approved}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
