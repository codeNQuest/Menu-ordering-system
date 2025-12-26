
import React from "react";
import "./AdminPage.css";

import { Link,useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AdminLogin() {
    const handleSubmit = (e) => {
    e.preventDefault();
    };
    const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/admin"); 
  };
  return (
    <div className="page fade-in"> 
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login</h2> 
      <div className="login-form">
          <label htmlFor="username" >Username:</label><br />
          <input type="text" id="username"  placeholder="Username"name="username" className="login-input" required/><br />
          <label htmlFor="username" >Password:</label><br />
          <input  type="password" id="passwoed" placeholder="password"name="username" className="login-input"  required /><br />
          <button type="submit" className="login-button" onClick={goToLogin} alert>Login</button>
        </div>
      </div>  
    </div>
  </div>
  );
}

export default AdminLogin;
