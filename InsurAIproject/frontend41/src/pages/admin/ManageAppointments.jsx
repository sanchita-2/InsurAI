
import React, { useEffect, useState } from "react";
import { adminGetAppointments } from "../../api";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
export default function ManageAppointments(){
  const [apps,setApps] = useState([]);
  useEffect(()=>{ (async ()=>{ setApps(await adminGetAppointments()); })(); }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <h2>All Appointments</h2>
        <div className="card">
          {apps.map(a => (
            <div key={a.id} style={{marginBottom:10}}>
              <div><strong>{a.userName} → {a.agentName}</strong></div>
              <div>{a.message}</div>
              <div className="small">{a.appointmentTime}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
