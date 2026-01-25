import React, { useEffect, useState } from "react";
import "./Chef.css";
import AdminNavbar from "../../components/AdminNavbar";

const ChefPov = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from backend (MongoDB)
  const loadOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update order status in backend
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/admin/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      loadOrders(); // reload latest orders from DB
    } catch (err) {
      console.log(err);
    }
  };

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
                  <div className="card" key={order._id}>
                    <p><b>Table:</b> {order.tableNumber}</p>

                    <p><b>Items:</b></p>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} x {item.qty}
                        </li>
                      ))}
                    </ul>

                    {status === "Pending" && (
                      <button
                        className="chef-button"
                        onClick={() => updateStatus(order._id, "Cooking")}
                      >
                        Start Cooking
                      </button>
                    )}

                    {status === "Cooking" && (
                      <button
                        className="chef-button"
                        onClick={() => updateStatus(order._id, "Ready")}
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
};

export default ChefPov;
