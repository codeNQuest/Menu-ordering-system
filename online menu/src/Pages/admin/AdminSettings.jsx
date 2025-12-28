
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

        <div className="form-row1">
         <label>Restaurant name</label>
          <input type="text" />
        </div>

        <div className="form-row2">
          <label>Phone</label>
          <input type="text" />
        </div>
      
        <button>Save Changes</button>
    </div>

            
          </div>

          
          

      
    
    </>
    
  );
}

export default AdminSettings;