import React from "react";
import "../global.css";
import Navbar from "../components/Navbar";

export default function Home(){
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h1>Welcome to InsurAI</h1>
          <p className="small">An insurance app with appointments & notifications.</p>
        </div>
      </div>
    </>
  );
}
