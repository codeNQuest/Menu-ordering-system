import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!customerPhone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!tableNumber.trim()) {
      toast.error('Please enter table number');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create order object
      const orderData = {
        customerName,
        customerPhone,
        tableNumber: parseInt(tableNumber),
        paymentMethod,
        items: cartItems,
        subtotal,
        tax,
        total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Send order to backend
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();
      
      // Generate order number
      const generatedOrderNumber = result.orderId || Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrderNumber);
      setOrderPlaced(true);

      // Clear cart after successful order
      localStorage.removeItem('cart');
      toast.success('Order placed successfully!');

    } catch (err) {
      console.error('Order error:', err);
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quantity handlers
  const increaseQuantity = (itemId) => {
    const updated = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const decreaseQuantity = (itemId) => {
    const updated = cartItems
      .map(item =>
        item._id === itemId ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
      );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  return (
    <div className="cpage">
      {orderPlaced ? (
        <div className="confirmation">
          <h2>Order Confirmed ✅</h2>
          <p>Thank you for your order!</p>
          <div className="order-number">#{orderNumber}</div>
          <p className="customer-info">Name: {customerName}</p>
          <p className="customer-info">Table: #{tableNumber}</p>
          <p className="customer-info">Amount: ₹{total.toFixed(2)}</p>
          <p>Food will be served shortly 🍽️</p>
          <Link to="/Menu">
            <button className="back-menu-btn">Back to Menu</button>
          </Link>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>No items in cart</h2>
          <p>Start ordering food!</p>
          <Link to="/Menu">
            <button className="start-ordering-btn">Start Ordering</button>
          </Link>
        </div>
      ) : (
        <div className="hero-card">
          {/* Left Section - Customer Info & Payment */}
          <div className="hero-left">
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <div className="customer-info-section">
                <h3>Customer Information</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              {/* Table Information */}
              <div className="table-info">
                <h3>Table Information</h3>
                <input
                  type="number"
                  placeholder="Table Number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                  min="1"
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
                  className={`payment-option ${paymentMethod === "counter" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("counter")}
                >
                  <span>Pay at Counter</span>
                  <small>Pay when you pick up your order</small>
                </div>
                <div
                  className={`payment-option ${paymentMethod === "online" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("online")}
                >
                  <span>Pay Online</span>
                  <small>Pay now with credit/debit card</small>
                </div>
              </div>

              <button type="submit" disabled={loading} className="place-order-btn">
                {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
              </button>
            </form>

            <Link to="/Cart">
              <button className="back-to-cart-btn">Back to Cart</button>
            </Link>
          </div>

          {/* Right Section - Order Summary */}
          <div className="hero-right">
            <h3>Order Summary</h3>
            <div className="cart-summary">
              {cartItems.map((item) => (
                <div key={item._id} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">₹{item.price}</span>
                  </div>
                  <div className="qty-controls">
                    <button 
                      type="button"
                      onClick={() => decreaseQuantity(item._id)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-display">{item.quantity || 1}</span>
                    <button 
                      type="button"
                      onClick={() => increaseQuantity(item._id)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <span className="item-total">
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

