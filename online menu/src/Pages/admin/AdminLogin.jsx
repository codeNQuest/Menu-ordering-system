// Pages/admin/AdminLogin.jsx
import React from "react";
import "./AdminPage.css";

function AdminLogin() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login</h2> 
      <div className="login-form">
          <label htmlFor="username" >Username:</label><br />
          <input type="text" id="username"  placeholder="Username"name="username" className="login-input" /><br />
          <label htmlFor="username" >Password:</label><br />
          <input type="password" id="passwoed" placeholder="password"name="username" className="login-input" /><br />
          <button type="submit" className="login-button">Login</button>
        </div>
      </div>  
    </div>
  );
}

export default AdminLogin;

