import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");



  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Order state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart and discount from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCoupon = localStorage.getItem('appliedCoupon');
    const savedDiscount = localStorage.getItem('appliedDiscount');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }
    if (savedCoupon) setAppliedCoupon(savedCoupon);
    if (savedDiscount) setAppliedDiscount(parseFloat(savedDiscount));
  }, []);



  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const shippingCost = 0;
  const total = parseFloat((subtotal - appliedDiscount + tax + shippingCost).toFixed(2));

  // Validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
  };

  // Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!validateEmail(customerEmail)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (!validatePhone(customerPhone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (paymentMethod === 'credit-card') {
      if (!cardNumber || cardNumber.length !== 16) {
        toast.error('Card number must be 16 digits');
        return;
      }
      if (!cardHolder.trim()) {
        toast.error('Please enter card holder name');
        return;
      }
      if (!expiry || !cvv || cvv.length !== 3) {
        toast.error('Please enter valid expiry and CVV');
        return;
      }
    }

    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone,
        items: cartItems,
        subtotal,
        tax,
        discount: appliedDiscount,
        discountCode: appliedCoupon,
        shippingCost,
        total,
        paymentMethod,
        paymentStatus: 'completed',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) throw new Error('Failed to place order');

      const result = await response.json();
      
      setOrderData({
        ...orderPayload,
        orderId: result.orderId || result.order?._id,
        orderNumber: Math.floor(100000 + Math.random() * 900000)
      });
      
      setOrderPlaced(true);
      localStorage.removeItem('cart');
      localStorage.removeItem('appliedCoupon');
      localStorage.removeItem('appliedDiscount');
      
      toast.success('Order placed successfully!');
    } catch (err) {
      console.error('Order error:', err);
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Order confirmation
  if (orderPlaced && orderData) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>

          <div className="confirmation-details">
            <p><strong>Order #:</strong> {orderData.orderNumber}</p>
            <p><strong>Name:</strong> {orderData.customerName}</p>
            <p><strong>Email:</strong> {orderData.customerEmail}</p>
            <p><strong>Total:</strong> ₹{orderData.total.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className="status-badge">PENDING</span></p>
          </div>

          <div className="items-list">
            <h3>Items Ordered:</h3>
            {orderData.items.map((item) => (
              <div key={item._id} className="item-row">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Link to="/Menu">
            <button className="btn-primary">Continue Shopping</button>
          </Link>
          <Link to="/">
            <button className="btn-secondary">Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-message">
          <h2>Your cart is empty</h2>
          <Link to="/Menu">
            <button className="btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-left">
          <h1>Checkout</h1>

          <form onSubmit={handleSubmit}>
            {/* Customer Info */}
            <div className="form-section">
              <h3>Customer Information</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number (10 digits)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>UPI</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Card Details */}
            {paymentMethod === 'credit-card' && (
              <div className="form-section">
                <h3>Card Details</h3>
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="form-input"
                  maxLength="16"
                  required
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="form-input"
                  required
                />
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="form-input"
                    maxLength="5"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="form-input"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="place-order-btn">
              {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
            </button>
          </form>

          <Link to="/Cart">
            <button className="back-to-cart-btn">Back to Cart</button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="checkout-right">
          <h2>Order Summary</h2>

          <div className="items-preview">
            {cartItems.map((item) => (
              <div key={item._id} className="preview-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="price-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="summary-row discount">
                <span>Discount ({appliedCoupon})</span>
                <span>-₹{appliedDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

