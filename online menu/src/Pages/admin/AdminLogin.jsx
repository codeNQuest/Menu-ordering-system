import { useState } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Login failed");
    return;
  }

  // ✅ SAVE ADMIN DATA HERE
  localStorage.setItem("adminId", data.adminId);
  localStorage.setItem("username", data.username);

  toast.success("Login success");

  navigate("/admin");
};

  return (
    <div className="page fade-in">
      <Toaster />
      <div className="login-page">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label><br />
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /><br />

            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
