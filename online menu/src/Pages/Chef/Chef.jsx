import React, { useEffect, useState } from "react";
import "./Chef.css";
import AdminNavbar from "../../components/AdminNavbar";

const ChefPov = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load orders from backend (MongoDB)
  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // Poll for new orders every 10 seconds
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update order status in backend
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update order');
      loadOrders(); // reload latest orders from DB
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="chef-container">
        <h1>Chef Dashboard</h1>

        {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</p>}

        <div className="columns">
          {["pending", "processing", "completed"].map((status) => (
            <div className="column" key={status}>
              <h2 className="status-title">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>

              {orders
                .filter((order) => order.status === status)
                .map((order) => (
                  <div className="card" key={order._id}>
                    <div className="card-header">
                      <p><b>Order #:</b> {order.orderNumber || order._id.substring(0, 8)}</p>
                      <p><b>Customer:</b> {order.customerName}</p>
                    </div>

                    <p><b>Phone:</b> {order.customerPhone}</p>

                    <p><b>Items:</b></p>
                    <ul className="items-list">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} x {item.quantity} (₹{(item.price * item.quantity).toFixed(2)})
                          </li>
                        ))
                      ) : (
                        <li>No items</li>
                      )}
                    </ul>

                    <p><b>Total:</b> ₹{order.total?.toFixed(2) || '0.00'}</p>

                    {status === "pending" && (
                      <button
                        className="chef-button start-cooking"
                        onClick={() => updateStatus(order._id, "processing")}
                      >
                        Start Cooking
                      </button>
                    )}

                    {status === "processing" && (
                      <button
                        className="chef-button mark-ready"
                        onClick={() => updateStatus(order._id, "completed")}
                      >
                         Mark Ready
                      </button>
                    )}

                    {status === "completed" && <p className="ready-text"> Ready to Serve</p>}
                  </div>
                ))}

              {orders.filter((order) => order.status === status).length === 0 && !loading && (
                <p className="no-orders">No {status} orders</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChefPov;
