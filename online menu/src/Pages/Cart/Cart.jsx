import React, { useState, useEffect } from "react";
import "./Cart.css";
import { FaShoppingCart, FaTrash } from "../../icons";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Load cart from localStorage on mount
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
    if (savedCoupon) setCouponCode(savedCoupon);
    if (savedDiscount) setAppliedDiscount(parseFloat(savedDiscount));
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Coupon codes
  const coupons = {
    FIRST20: 0.20,
    SECOND10: 0.10,
    WELCOME15: 0.15,
    VIP25: 0.25
  };

  // Increase quantity
  const increaseQuantity = (itemId) => {
    const updated = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
    toast.success('Quantity increased');
  };

  // Decrease quantity
  const decreaseQuantity = (itemId) => {
    const updated = cartItems
      .map(item =>
        item._id === itemId ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
      );
    setCartItems(updated);
    toast.success('Quantity decreased');
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updated = cartItems.filter(item => item._id !== itemId);
    setCartItems(updated);
    toast.success('Item removed from cart');
  };

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setCartItems([]);
      setCouponCode('');
      setAppliedDiscount(0);
      setCouponInput('');
      localStorage.removeItem('appliedCoupon');
      localStorage.removeItem('appliedDiscount');
      toast.success('Cart cleared');
    }
  };

  // Apply coupon
  const applyCoupon = () => {
    if (!couponInput.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const code = couponInput.toUpperCase();
    if (coupons[code]) {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      const discount = subtotal * coupons[code];
      
      setCouponCode(code);
      setAppliedDiscount(discount);
      setCouponInput('');
      
      localStorage.setItem('appliedCoupon', code);
      localStorage.setItem('appliedDiscount', discount);
      
      toast.success(`Coupon applied! ${coupons[code] * 100}% off`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponInput('');
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('appliedDiscount');
    toast.success('Coupon removed');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const discountedSubtotal = subtotal - appliedDiscount;
  const total = parseFloat((discountedSubtotal + tax).toFixed(2));

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <FaShoppingCart size={80} />
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to get started!</p>
          <Link to="/Menu">
            <button className="continue-shopping">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <h1>Shopping Cart ({cartItems.length})</h1>
          
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="category">{item.category}</p>
                  <p className="price">₹{Number(item.price).toFixed(2)}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item._id)} className="qty-btn">−</button>
                  <span className="quantity">{item.quantity || 1}</span>
                  <button onClick={() => increaseQuantity(item._id)} className="qty-btn">+</button>
                </div>

                <div className="item-total">
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeItem(item._id)} 
                  className="remove-btn"
                  title="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          {/* Coupon Code Section */}
          <div className="coupon-section">
            <h3>Apply Coupon</h3>
            {couponCode ? (
              <div className="coupon-applied">
                <p>✓ Code: <strong>{couponCode}</strong></p>
                <p className="discount-amount">Discount: -₹{appliedDiscount.toFixed(2)}</p>
                <button onClick={removeCoupon} className="remove-coupon-btn">Remove</button>
              </div>
            ) : (
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                  className="coupon-input"
                />
                <button onClick={applyCoupon} className="apply-coupon-btn">Apply</button>
              </div>
            )}
            <p className="coupon-hint">Try: FIRST20, SECOND10, WELCOME15, VIP25</p>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            {appliedDiscount > 0 && (
              <div className="summary-row discount">
                <span>Discount ({couponCode})</span>
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

          <Link to="/Checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>

          <Link to="/Menu">
            <button className="continue-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
 