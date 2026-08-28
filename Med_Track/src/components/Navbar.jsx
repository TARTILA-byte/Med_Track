import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>MED</span>TRACK
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/all-medicines">All Medicines</Link>
        {/* <Link to="/add-medicine">Add Medicines</Link> */}
       
        <Link to="/my-medicines">My Medicines</Link>
         <Link to="/dose-history">Dose History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
