import React, { useState, useEffect } from "react";
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
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data || []);
      
      // Calculate stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;
      let totalRev = 0;

      data.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);

        if (orderDate >= today) todayCount++;
        if (orderDate >= weekStart) weekCount++;
        if (orderDate >= monthStart) monthCount++;
        
        totalRev += order.total || 0;
      });

      setStats({
        today: todayCount,
        week: weekCount,
        month: monthCount,
        totalRevenue: totalRev
      });
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "delivered" })
      });
      if (res.ok) {
        loadOrders();
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const handleCancelled = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" })
      });
      if (res.ok) {
        loadOrders();
      }
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  useEffect(() => {
    loadOrders();
    // Poll for new orders every 15 seconds
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'processing' || order.status === 'confirmed'
  );

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-box">
        <h2>DASHBOARD</h2>

        <div className="stats-row">
          <div className="inner-box">
            <h3>Today</h3>
            <p>Total Orders:</p>
            <p>{stats.today}</p>
          </div>

          <div className="inner-box">
            <h3>Week</h3>
            <p><FaRupeeSign/>Total Orders:</p>
            <p>{stats.week}</p>
          </div>

          <div className="inner-box">
            <h3>Month</h3>
            <p>Total Orders:</p>
            <p>{stats.month}</p>
          </div>

          <div className="inner-box">
            <h3>Revenue</h3>
            <p><FaRupeeSign/>Total:</p>
            <p>₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <hr></hr>
        
        <div>
          <h3>Pending & Active Orders</h3>
          {loading && <p>Loading orders...</p>}
        </div>
        
        <div className="adminorders">
          {pendingOrders.length > 0 ? (
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber || order._id.substring(0, 8)}</td>
                    <td>
                      <div>
                        <p><strong>{order.customerName}</strong></p>
                        <small>{order.customerPhone}</small>
                      </div>
                    </td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
                        {order.items?.map((item, idx) => (
                          <li key={idx}>{item.name} x{item.quantity}</li>
                        ))}
                      </ul>
                    </td>
                    <td><strong>₹{order.total?.toFixed(2) || '0.00'}</strong></td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="action-btn delivered-btn"
                        onClick={() => handleDelivered(order._id)}
                        title="Mark as Delivered"
                      >
                        ✓ Deliver
                      </button>
                      <button 
                        className="action-btn cancel-btn"
                        onClick={() => handleCancelled(order._id)}
                        title="Cancel Order"
                      >
                        ✕ Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
              No pending or active orders
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
