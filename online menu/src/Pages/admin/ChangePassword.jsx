import React, { useState } from "react";
import "./AdminPage.css";
import AdminNavbar from "../../components/AdminNavbar";

import { Toaster } from "react-hot-toast";

function changepassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // later call your /admin/change-password API here
    console.log({ currentPassword, newPassword, confirmPassword });
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
            <label htmlFor="currentPassword">Current Password:</label><br />
            <input
              type="password"
              id="currentPassword"
              placeholder="Current password"
              name="currentPassword"
              className="login-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            /><br />

            <label htmlFor="newPassword">New Password:</label><br />
            <input
              type="password"
              id="newPassword"
              placeholder="New password"
              name="newPassword"
              className="login-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            /><br />

            <label htmlFor="confirmPassword">Confirm New Password:</label><br />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              name="confirmPassword"
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

export default changepassword;
