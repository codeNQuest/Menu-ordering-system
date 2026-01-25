import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedDiscount = localStorage.getItem('discountCode');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }
    if (savedDiscount) {
      setDiscountCode(savedDiscount);
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist discount code
  useEffect(() => {
    if (discountCode) {
      localStorage.setItem('discountCode', discountCode);
    }
  }, [discountCode]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('discountCode');
  };

  // Apply discount code
  const applyDiscountCode = (code, subtotal) => {
    // Discount codes: FIRST20 (20%), SECOND10 (10%), WELCOME15 (15%)
    const discountCodes = {
      FIRST20: 0.20,
      SECOND10: 0.10,
      WELCOME15: 0.15,
      VIP25: 0.25,
    };

    if (discountCodes[code]) {
      const discount = subtotal * discountCodes[code];
      setDiscountCode(code);
      setDiscountAmount(discount);
      return { valid: true, discount, percentage: discountCodes[code] * 100 };
    }

    return { valid: false, discount: 0, message: 'Invalid coupon code' };
  };

  // Remove discount
  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountAmount(0);
    localStorage.removeItem('discountCode');
  };

  // Calculate totals
  const calculateTotals = (shippingCost = 0) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = parseFloat((subtotal * 0.08).toFixed(2));
    const discountedSubtotal = subtotal - discountAmount;
    const total = parseFloat((discountedSubtotal + tax + shippingCost).toFixed(2));

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax,
      discount: parseFloat(discountAmount.toFixed(2)),
      shippingCost: parseFloat(shippingCost.toFixed(2)),
      total,
      itemCount: cartItems.length,
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cartItems,
    discountCode,
    discountAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscountCode,
    removeDiscount,
    calculateTotals,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
