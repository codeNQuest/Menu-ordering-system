import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminPage.css";
import Changepassword from "./ChangePassword";
const API_URL = import.meta.env.VITE_API_URL;

import adminPic from "../../assets/avatar_food.png";

function AdminSettings() {
  const [loginCount, setLoginCount] = useState(0);

  useEffect(() => {
    const fetchLoginCount = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/login-logs/count`);
        const data = await res.json();
        setLoginCount(data.total);
      } catch (err) {
        console.error("LOGIN COUNT ERROR", err);
      }
    };

    fetchLoginCount();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="setting-box">
        <h2>setting</h2>
        
        {/* Profile Section */}
        <div className="setting-box1">
         <div className="setting-row">
           <img src={adminPic} alt="admin-pic" className="setting-avatar" />
           <h3>Admin</h3>
           <h4>Ashishfood@gmail.com</h4>
           <Link to="/adminchangepass" className="setting-btn">
             Change Password
           </Link>
         </div>
        </div>

        {/* Restaurant Information */}
        <div className="setting-simple">
         <h3>Restaurant Information</h3>
         <div className="form-row1">
           <label>Restaurant name</label>
           <input type="text" />
         </div>

         <div className="form-row2">
           <label>Phone</label>
           <input type="text" />
         </div>

         <div className="form-row1">
           <label>Address</label>
           <input type="text" placeholder="Street address" />
         </div>

         <div className="form-row2">
           <label>City</label>
           <input type="text" />
         </div>

         <div className="form-row1">
           <label>Cuisine Type</label>
           <input type="text" placeholder="e.g., Italian, Indian, Chinese" />
         </div>
        </div>

        {/* Account Settings */}
        <div className="setting-simple">
         <h3>Account Settings</h3>
         <div className="form-row1">
           <label>Username</label>
           <input type="text" />
         </div>

         <div className="form-row2">
           <label>Email</label>
           <input type="email" />
         </div>

         <div className="form-row1">
           <label>Account Status</label>
           <input type="text" value="Active" disabled />
         </div>
        </div>

        {/* Account Security */}
        <div className="setting-simple">
         <h3>Account Security</h3>
         <div className="security-info">
           <p>Last login: Today at 2:30 PM</p>
           <p>Active devices: {loginCount}</p>
         </div>
        </div>

        {/* Save Button */}
        <div className="setting-simple">
         <button className="save-button">Save Changes</button>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;
