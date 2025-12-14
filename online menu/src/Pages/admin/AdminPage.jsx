// src/Pages/admin/AdminPage.jsx
import React, { useState } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin.jsx"; // keep this for route element in your router
import Cart from "../Cart/Cart";
import { Link,NavLink } from "react-router-dom";

function AdminPage() {
  return (
     <nav className="navbar-admin">
      <div className="logo">
        <span className="logo-icon">🍽</span>
        <span>ASHISH FAST FOOD</span>
      </div>
      <ul className="nav-links-admin">
        <li>Dashboard</li>
        <li><Link to= "/Cart">Orders</Link></li>
        <li>Menu Management</li>
        <li>Settings</li>
      </ul>

     
    </nav>
      
      
    
  );
}
export default AdminPage;