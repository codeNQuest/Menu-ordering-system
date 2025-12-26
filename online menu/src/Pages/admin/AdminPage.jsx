import React from "react";
import {
  FaUser,
  FaStore,
  FaBell,
  FaLock,
  DiAptana,
  CgProfile,
  IoExitOutline,
  IoMenu,
  PiHamburgerFill,
  FaRupeeSign
} from "../../icons.js";

import "./AdminPage.css";
import AdminNavbar from "../../components/AdminNavbar.jsx";

function AdminPage() {
  return (
    <>
      <AdminNavbar />
      <div className="dashboard-box">
  <h2>DASHBOARD</h2>

  <div className="stats-row">
    <div className="inner-box">
      <h3>Today</h3>
      <p>Total Orders:</p>
      <p>124</p>
    </div>

    <div className="inner-box">
      <h3>Week</h3>
      <p><FaRupeeSign/>Total Orders:</p>
      <p>780</p>
    </div>

    <div className="inner-box">
      <h3>Month</h3>
      <p>Total Orders:</p>
      <p>3,240</p>
    </div>
  </div>
  <hr></hr>
  <div>Orders</div>
  <div className="adminorders">
     <table className="recent-table">
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            
            <th>Customer</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Delivered</th>
            <th>Cancelled</th>
          </tr>
        </thead>
  </table>
  </div>
</div>
    </>
  );
}

export default AdminPage;
