import React, { useState } from "react";
import "./AdminPage.css";
import AdminNavbar from "../../components/AdminNavbar";

function AdminSettings() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [defaultPayment, setDefaultPayment] = useState("cash"); // "cash" | "online"

  return (
    <div className="page fade-in">
      <AdminNavbar />

      <div className="adminsettings-card">
        <h2>General Settings</h2>

        <div className="admininputs">
          {/* Restaurant Name */}
          <div className="settings-row">
            <span className="settings-label">Restaurant Name</span>
            <input
              type="text"
              className="settings-input"
              placeholder="Restaurant Name"
            />
          </div>

          {/* Notifications toggle */}
          <div className="settings-row">
            <span className="settings-label">Notifications</span>
            <button
              type="button"
              className={`settings-toggle ${
                notificationsOn ? "on" : "off"
              }`}
              onClick={() => setNotificationsOn((prev) => !prev)}
            >
              <span className="toggle-knob" />
            </button>
          </div>

          {/* Default payment / order type */}
          <div className="settings-row">
            <span className="settings-label">Default Order Type</span>
            <div className="payment-options">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="paymentType"
                  value="cash"
                  checked={defaultPayment === "cash"}
                  onChange={() => setDefaultPayment("cash")}
                />
                Cash
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="paymentType"
                  value="online"
                  checked={defaultPayment === "online"}
                  onChange={() => setDefaultPayment("online")}
                />
                Online Payment
              </label>
            </div>
          </div>

          {/* Contact Email */}
          <div className="settings-row">
            <span className="settings-label">Contact Email</span>
            <input
              type="email"
              className="settings-input"
              placeholder="email@example.com"
            />
          </div>

          {/* Save button */}
          <div className="settings-footer">
            <button className="settings-save">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;

