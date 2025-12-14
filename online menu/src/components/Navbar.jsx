// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // or separate Navbar.css if you prefer

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🍽</span>
        <span>ASHISH FAST FOOD</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Cart">Contact</Link></li>
        <li><Link to="/AdminLogin">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
