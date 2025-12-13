import React, { useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNumber: 5,
      items: ["Burger", "Fries"],
      status: "Pending",
    },
    {
      id: 2,
      tableNumber: 3,
      items: ["Pizza", "Coke"],
      status: "Preparing",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <h2>Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order">
            <p>Table: {order.tableNumber}</p>
            <p>Items: {order.items.join(", ")}</p>
            <p>Status: {order.status}</p>
            <div className="buttons">
              <button className="Prepareingbuttons" onClick={() => updateStatus(order.id, "Pending")}>
                Pending
              </button>
              <button onClick={() => updateStatus(order.id, "Preparing")}>
                Preparing
              </button>
              <button onClick={() => updateStatus(order.id, "Completed")}>
                Completed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
