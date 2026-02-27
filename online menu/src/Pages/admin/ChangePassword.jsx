import React, { useState } from "react";
import "./AdminPage.css";
import AdminNavbar from "../../components/AdminNavbar";
import { Toaster, toast } from "react-hot-toast";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const adminId = localStorage.getItem("adminId");

      const response = await fetch("http://localhost:5000/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="page fade-in">
        <Toaster />
        <div className="login-page">
          <div className="login-box">
            <h2>Change Password</h2>
            <form className="login-form" onSubmit={handleSubmit}>

              <label>Current Password:</label><br />
              <input
                type="password"
                className="login-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              /><br />

              <label>New Password:</label><br />
              <input
                type="password"
                className="login-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              /><br />

              <label>Confirm New Password:</label><br />
              <input
                type="password"
                className="login-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              /><br />

              <button type="submit" className="login-button">
                Change Password
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;