// src/components/AdminNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Pages/admin/AdminPage.css";
import adminPic from "../assets/avatar_food.png";

// adjust this import to how you actually export icons
import { FaStore, CgProfile, IoExitOutline } from "../icons";
// OR import them directly from react-icons if that's what you use:
// import { FaStore } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { IoExitOutline } from "react-icons/io5";
import { DiAptana } from "react-icons/di";

function AdminNavbar() {
  const [showBox, setShowBox] = useState(false);

  return (
    <nav className="navbar-admin">
      <div className="logo">
        <span className="logo-icon">🍽</span>
        <span>ASHISH FAST FOOD</span>
      </div>

      <ul className="nav-links-admin">
        <li>Dashboard</li>

        <li>
          <Link to="/admin/orders">
            <FaStore /> Orders
          </Link>
        </li>

        <li>Menu Management</li>

        <li className="admin-avatar-wrapper">
          <img
            src={adminPic}
            alt="admin"
            className="admin-pic"
            onClick={() => setShowBox((p) => !p)}
          />

          {showBox && (
            <div className="admin-dropdown-box">
              <img src={adminPic} alt="admin" className="imgavatar" />
              <p>Admin • Ashish</p>

              <Link to="/AdminProfile">
                <button type="button">
                  <CgProfile /> Profile
                </button>
              </Link>

              <Link to="/AdminSettings">
                <button type="button">
                  <DiAptana /> Settings
                </button>
              </Link>

              <Link to="/AdminLogin">
                <button type="button">
                  <IoExitOutline /> Logout
                </button>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;


