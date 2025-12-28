import React, { useState, useEffect } from "react";
import "./Chef.css";
import AdminNavbar from "../../components/AdminNavbar";

const ChefPov = () => {
  const [orders, setOrders] = useState([
    { id: 1, table: 1, item: "Pizza", status: "Pending" },
    { id: 2, table: 2, item: "Burger", status: "Pending" },
    { id: 3, table: 3, item: "Caesar Salad", status: "Pending" },
    { id: 4, table: 4, item: "Margherita Pizza", status: "Pending" },
    { id: 5, table: 5, item: "Peri Peri Fries", status: "Pending" },
    { id: 6, table: 6, item: "Cheese Fries", status: "Pending" },
  ]);

  // ✅ Load saved data on refresh
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // ✅ Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
<>
      <AdminNavbar />
    <div className="chef-container">
      <h1>Chef Dashboard</h1>

      <div className="columns">
        {["Pending", "Cooking", "Ready"].map((status) => (
          <div className="column" key={status}>
            <h2>{status}</h2>

            {orders
              .filter((order) => order.status === status)
              .map((order) => (
                <div className="card" key={order.id}>
                  <p>
                    <b>Table:</b> {order.table}
                  </p>
                  <p>
                    <b>Item:</b> {order.item}
                  </p>

                  {status === "Pending" && (
                    <button
                      className="chef-button"
                      onClick={() => updateStatus(order.id, "Cooking")}
                    >
                      Start Cooking
                    </button>
                  )}

                  {status === "Cooking" && (
                    <button
                      className="chef-button"
                      onClick={() => updateStatus(order.id, "Ready")}
                    >
                      Mark Ready
                    </button>
                  )}

                  {status === "Ready" && <p>✅ Ready to Serve</p>}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
 </>
  
  );

} 

export default ChefPov;
