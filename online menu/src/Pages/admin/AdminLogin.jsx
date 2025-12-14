
import React from "react";
import "./AdminPage.css";
import "./AdminPage.jsx"
import { Link,useNavigate} from "react-router-dom";

function AdminLogin() {
    const handleSubmit = (e) => {
    e.preventDefault();
    };
    const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/admin"); 
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login</h2> 
      <div className="login-form">
          <label htmlFor="username" >Username:</label><br />
          <input type="text" id="username"  placeholder="Username"name="username" className="login-input" re/><br />
          <label htmlFor="username" >Password:</label><br />
          <input  type="password" id="passwoed" placeholder="password"name="username" className="login-input"  required /><br />
          <button type="submit" className="login-button" onClick={goToLogin}>Login</button>
        </div>
      </div>  
    </div>
  );
}

export default AdminLogin;

