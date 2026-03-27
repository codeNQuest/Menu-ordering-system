// src/components/Navbar.jsx
import React from "react";
import { NavLink,Link } from "react-router-dom";
import "../App.css"; 
import { FaHome , FaStore,MdAccountCircle ,FaInfoCircle } from "../icons";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🍽</span>
        <span className="logo">Delicious Bites</span>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" end className="nav-link"><FaHome />Home</NavLink></li>
        <li><NavLink to="/Menu" className="nav-link">< FaStore/>Menu</NavLink></li>
        <li><NavLink to="/about" className="nav-link"><FaInfoCircle />About</NavLink></li>
        <li><NavLink to="/login" className="nav-link"><MdAccountCircle/>Login</NavLink></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
