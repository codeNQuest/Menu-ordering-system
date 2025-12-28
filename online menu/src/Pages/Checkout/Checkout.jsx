import React, { useState } from "react";
import "./Checkout.css";

const CheckoutPage = () => {
  const cartItems = [
    { id: 1, name: "Classic Cheeseburger", price: 8.99, qty: 1 },
    { id: 2, name: "Double Deluxe Burger", price: 12.99, qty: 1 },
    { id: 3, name: "Spicy Chicken Burger", price: 9.99, qty: 1 },
    { id: 4, name: "Crispy Chicken Tenders", price: 7.99, qty: 1 },
  ];

  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderNumber(Math.floor(100000 + Math.random() * 900000));
    setOrderPlaced(true);
  };

  return (
    <div className="cpage">
     

      {orderPlaced ? (
        <div className="confirmation">
          <h2>Order Confirmed ✅</h2>
          <p>Your order number</p>
          <div className="order-number">#{orderNumber}</div>
          <p>Food will be served shortly 🍽️</p>
        </div>
      ) : (
        <div className="hero-card">
          {/* Left Section */}
          <div className="hero-left">
            <h1>Checkout</h1>

            {/* Table Information */}
            <div className="table-info">
              <h3>Table Information</h3>
              <input
                type="number"
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
              <div className="table-placeholder">
                {tableNumber ? `#${tableNumber}` : "#Not Set"}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <h3>Payment Method</h3>
              <p>Choose how you'd like to pay</p>
              <div
                className={`payment-option ${
                  paymentMethod === "counter" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("counter")}
              >
                <span>Pay at Counter</span>
                <small>Pay when you pick up your order</small>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "online" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span>Pay Online</span>
                <small>Pay now with credit/debit card</small>
              </div>
            </div>

            <button onClick={handleSubmit}>
              Place Order - ₹{total.toFixed(2)}
            </button>
          </div>

          {/* Right Section */}
          <div className="hero-right">
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="order-total">
              <span>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="order-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
