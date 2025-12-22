
import React, { useState } from "react";
import "./AdminPage.css";
import { Link } from "react-router-dom";
import adminPic from "../../assets/avatar_food.png";
import AdminSettings from "./AdminSettings.jsx";

import {FaUser,FaStore, FaBell,FaLock,DiAptana,IoMenu,CgProfile,IoExitOutline,} from "../../icons";

function AdminPage() {
    const [showBox, setShowBox] = useState(false); 

    const admin = () => {
    setShowBox((prev) => !prev);  
  };
  return (
    <nav className="navbar-admin">
      <div className="logo">
        <span className="logo-icon">🍽</span>
        <span>ASHISH FAST FOOD</span>
      </div>

      <ul className="nav-links-admin">
        <li>Dashboard</li>
        <li>
          <Link to="/Cart"><FaStore /> Orders</Link>
        </li>
        <li>Menu Management</li>
        <li>
          <img src={adminPic} alt="admin-pic" className="admin-pic" onClick={admin} />
        
            {showBox && (
            <div className="admin-dropdown-box">
              <img src={adminPic} alt="admin-pic" className="imgavatar"/>
              <p>Admin • Ashish</p>
              <br />
              <button><CgProfile /> Profile</button><br />
              <button><Link to="/AdminSettings"><DiAptana /> Settings</Link></button><br />
              <button> <Link to="/Login"><IoExitOutline /> Logout</Link></button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AdminPage;
