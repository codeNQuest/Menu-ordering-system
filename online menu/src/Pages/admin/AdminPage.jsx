import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "../../icons.js";
import "./AdminPage.css";
import AdminNavbar from "../../components/AdminNavbar.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = import.meta.env.VITE_API_URL;

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(false);

  // ✅ Load Orders
  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data || []);

      // Stats calculation
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

        if (orderDate >= today) todayCount++;
        if (orderDate >= weekStart) weekCount++;
        if (orderDate >= monthStart) monthCount++;

        totalRev += order.total || 0;
      });

      setStats({
        today: todayCount,
        week: weekCount,
        month: monthCount,
        totalRevenue: totalRev,
      });
    } catch (err) {
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ DOWNLOAD EXCEL STYLE PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("All Orders Report", 14, 20);

    const tableColumn = [
      "Order ID",
      "Customer",
      "Phone",
      "Items",
      "Total Amount",
      "Date"
    ];

    const tableRows = [];

    orders.forEach((order) => {
      const itemsText = order.items
        ?.map((item) => `${item.name} x${item.quantity}`)
        .join(", ");

      const orderData = [
        order.orderNumber || order._id.substring(0, 8),
        order.customerName,
        order.customerPhone,
        itemsText,
        `₹${order.total?.toFixed(2) || "0.00"}`,
        new Date(order.createdAt).toLocaleString(),
      ];

      tableRows.push(orderData);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("All-Orders-Report.pdf");
  };

  return (
    <div className="allpage">
      <AdminNavbar />

      <div className="dashboard-box">
        <h2>DASHBOARD</h2>

        {/* Stats */}
        <div className="stats-row">
          <div className="inner-box">
            <h3>Today</h3>
            <p>Total Orders:</p>
            <p>{stats.today}</p>
          </div>

          <div className="inner-box">
            <h3>Week</h3>
            <p>Total Orders:</p>
            <p>{stats.week}</p>
          </div>

          <div className="inner-box">
            <h3>Month</h3>
            <p>Total Orders:</p>
            <p>{stats.month}</p>
          </div>

          <div className="inner-box">
            <h3>Revenue</h3>
            <p><FaRupeeSign /> Total:</p>
            <p>₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <hr />

        <h3>All Orders</h3>

        {/* ✅ Download Button */}
        <button
          onClick={handleDownloadPDF}
          style={{
            marginBottom: "15px",
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          Download 
        </button>

        {loading && <p>Loading orders...</p>}

        <div className="adminorders">
          {orders.length > 0 ? (
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber || order._id.substring(0, 8)}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>
                      {order.items
                        ?.map((item) => `${item.name} x${item.quantity}`)
                        .join(", ")}
                    </td>
                    <td>
                      <strong>₹{order.total?.toFixed(2) || "0.00"}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", padding: "20px" }}>
              No orders found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
