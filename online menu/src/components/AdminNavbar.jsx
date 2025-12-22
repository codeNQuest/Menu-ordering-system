
import { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { DiAptana } from "react-icons/di";
import { IoExitOutline } from "react-icons/io5";
import { FaStore } from "react-icons/fa";
import adminPic from "../assets/avatar_food.png";

import "../Pages/admin/AdminPage.css";

function AdminNavbar() {
  const [showBox, setShowBox] = useState(false);

  const toggleAdminBox = () => setShowBox(prev => !prev);

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
          <img
            src={adminPic}
            alt="admin-pic"
            className="admin-pic"
            onClick={toggleAdminBox}
          />

          {showBox && (
            <div className="admin-dropdown-box">
              <img src={adminPic} alt="admin-pic" className="imgavatar" />
              <p>Admin • Ashish</p>
              <br />
              <button><CgProfile /> Profile</button><br />
              <button>
                <Link to="/AdminSettings"><DiAptana /> Settings</Link>
              </button><br />
              <button>
                <Link to="/login"><IoExitOutline /> Logout</Link>
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
