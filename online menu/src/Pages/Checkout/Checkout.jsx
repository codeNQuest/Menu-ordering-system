import React, { useState } from "react";
import "./Checkout.css";

import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, getTotal } = useCart();
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const subtotal = getTotal();
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
      ) : cart.length === 0 ? (
        <div className="empty-cart">
          <h2>No items in cart</h2>
          <p>Start ordering food!</p>
          <Link to="/Menu">
            <button className="start-ordering-btn">Start Ordering</button>
          </Link>
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
                onChange={(e) => setTableNumber(e.target.value)}/>
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
                onClick={() => setPaymentMethod("counter")}>
                <span>Pay at Counter</span>
                <small>Pay when you pick up your order</small>
              </div>
              <div
                className={`payment-option ${
                  paymentMethod === "online" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("online")}>
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
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <div className="qty-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>Qty: {item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
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
