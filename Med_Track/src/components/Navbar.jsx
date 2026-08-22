import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>MED</span>TRACK
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/all-medicines">All Medicines</Link>
        <Link to="/my-medicines">My Medicines</Link>
      </div>
    </nav>
  );
};

export default Navbar;
