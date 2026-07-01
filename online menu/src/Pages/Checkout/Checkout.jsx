import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import Invoice from './Invoice.jsx';

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

  // Order state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart and discount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCoupon = localStorage.getItem('appliedCoupon');
    const savedDiscount = localStorage.getItem('appliedDiscount');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error(err);
      }
    }
    if (savedCoupon) setAppliedCoupon(savedCoupon);
    if (savedDiscount) setAppliedDiscount(parseFloat(savedDiscount));
  }, []);

  // Quantity Update 
  const updateQuantity = (id, change) => {
    const updatedCart = cartItems
      .map(item => {
        if (item._id === id) {
          const newQty = (item.quantity || 1) + change;
          if (newQty <= 0) return null;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const shippingCost = 0;
  const total = parseFloat((subtotal - appliedDiscount + tax + shippingCost).toFixed(2));

  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

  // Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) return toast.error('Please enter your name');
    if (!validateEmail(customerEmail)) return toast.error('Please enter a valid email');
    if (!validatePhone(customerPhone)) return toast.error('Please enter a valid phone number');

    if (paymentMethod === 'credit-card') {
      if (!cardNumber || cardNumber.length !== 16) return toast.error('Card must be 16 digits');
      if (!cardHolder.trim()) return toast.error('Enter card holder name');
      if (!expiry || !cvv || cvv.length !== 3) return toast.error('Invalid card details');
    }

    if (cartItems.length === 0) return toast.error('Cart is empty');

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

      const response = await fetch("http://localhost:5000/api/orders", {
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
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Order placed
  if (orderPlaced && orderData) {
    return (
      <div>
        <Invoice orderData={orderData} />
        <div className="confirmation-actions" style={{ textAlign: 'center', padding: '20px' }}>
          <Link to="/Menu"><button className="btn-primary">Continue Shopping</button></Link>
          <Link to="/"><button className="btn-primary">Back to Home</button></Link>
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
          <Link to="/Menu"><button className="btn-primary">Continue Shopping</button></Link>
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
            <div className="form-section">
              <h3>Customer Information</h3>
              <input className="form-input" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full Name" />
              <input className="form-input" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Email" />
              <input className="form-input" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone" />
            </div>

            {/* PAYMENT OPTIONS UNCHANGED */}
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">

                <label><input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} /><span>UPI</span></label>
                <label><input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} /><span>Cash </span></label>
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

        {/* ORDER SUMMARY WITH YOUR CSS */}
        <div className="checkout-right">
          <h2>Order Summary</h2>

          <div className="items-preview">
            {cartItems.map((item) => (
              <div key={item._id} className="preview-item">

                <span>
                  {item.name}

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                  </div>
                </span>

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