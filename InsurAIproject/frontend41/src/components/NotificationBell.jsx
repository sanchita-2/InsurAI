import React, { useEffect, useState } from "react";
import { getUserNotifications, markAllUserSeen } from "../api";
import { getCurrentUser } from "../auth";
import "./NotificationBell.css";
export default function NotificationBell(){
  const user = getCurrentUser();
  const [notes, setNotes] = useState([]);

  useEffect(()=> {
    let mounted = true;
    async function load(){
      if(!user) return;
      try{
        const res = await getUserNotifications(user.id);
        if(mounted) setNotes(res || []);
      }catch(e){ console.error(e); }
    }
    load();
    const iv = setInterval(load, 20000);
    return () => { mounted=false; clearInterval(iv); }
  }, [user]);

  async function markAll(){
    if(!user) return;
    try {
      await markAllUserSeen(user.id);
      setNotes([]);
    } catch(e){ console.error(e); }
  }

  return (
    <div style={{position:"relative"}}>
      <button title="Notifications">🔔</button>
      {notes.length>0 && <span className="badge">{notes.length}</span>}
      <div style={{position:"absolute",right:0,top:36,minWidth:260,background:"#fff",padding:8,boxShadow:"0 6px 18px rgba(16,24,40,0.08)",borderRadius:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <strong>Notifications</strong>
          <button onClick={markAll} style={{fontSize:12}}>Mark all</button>
        </div>
        <div style={{marginTop:8, maxHeight:240, overflow:"auto"}}>
          {notes.length===0 ? <div className="small">No notifications</div> : notes.map(n => (
            <div key={n.id} style={{padding:"8px 6px",borderBottom:"1px solid #f1f3f5"}}>
              <div style={{fontWeight:600}}>{n.title}</div>
              <div className="small">{n.message}</div>
              <div className="small">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
