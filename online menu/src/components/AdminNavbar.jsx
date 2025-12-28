
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaStore,
  DiAptana,
  CgProfile,
  IoExitOutline,
  PiHamburgerFill,
  MdDashboard
} from "../icons";


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
        <li>
          <Link to="/admin"><MdDashboard />Dashboard </Link>
        </li>
        
        <li>
          <Link to="/AdminChef"><FaStore /> Orders</Link>
        </li>
        <li><PiHamburgerFill/>Menu</li>
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
