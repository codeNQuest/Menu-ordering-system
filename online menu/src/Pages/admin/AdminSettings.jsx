
import { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminPage.css";
import adminPic from "../../assets/avatar_food.png";
function AdminSettings() {
  return (
    <>
      <AdminNavbar />
      <div className="setting-box">
        <h2>setting</h2>
        <div class="setting-box1">
        <div class="setting-row">
          <img src={adminPic} alt="admin-pic" className="setting-avatar" />
        <h3>Admin</h3>
        <h4>Ashishfood@gmail.com</h4>
        <button class="setting-btn">Change Password</button>
       </div>
      </div>
        <div className="setting-simple">
            <p>Restaurant name</p>
            <input type="text" placeholder="Ashish Food Hub" />
            <p>Phone</p>
            <input type="text" placeholder="+91 98765 43210" />
          </div>

          
          

      </div>
    
    </>
    
  );
}

export default AdminSettings;