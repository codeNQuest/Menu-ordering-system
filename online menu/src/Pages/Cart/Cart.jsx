import React, { useState, useEffect } from "react";
import "./Cart.css";
import { FaShoppingCart, FaTrash } from "../../icons";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

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

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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
        item._id === itemId ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) } : item
      )
      .filter(item => item.quantity > 0);
    setCartItems(updated);
    toast.success('Quantity decreased');
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updated = cartItems.filter(item => item._id !== itemId);
    setCartItems(updated);
    toast.success('Item removed from cart');
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setCartItems([]);
      toast.success('Cart cleared');
    }
  };

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
      <div className="cart-content">
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
                  <button onClick={() => decreaseQuantity(item._id)} className="qty-btn">-</button>
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
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
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
 