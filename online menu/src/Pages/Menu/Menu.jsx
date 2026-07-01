import { useState, useEffect } from "react";
import './Menu.css';
import toast from 'react-hot-toast';
import { FaSearch } from "../../icons.js";
import { FaShoppingCart } from "../../icons";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); 

  // Fetch menu from backend
  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      if (!res.ok) throw new Error("Failed to fetch menu");
      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setMenuItems([]);
    }
  };

  // Load menu + cart count
  useEffect(() => {
    fetchMenu();

    const raw = localStorage.getItem('cart');
    const cart = raw ? JSON.parse(raw) : [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  }, []);

  const categories = ["All Items", "Pizza", "Burgers", "Salads", "Pasta", "Desserts", "Fries"];

  let filteredItems = selectedCategory === "All Items"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Add to cart
  const addToCart = (item) => {
    try {
      const raw = localStorage.getItem('cart');
      const cart = raw ? JSON.parse(raw) : [];
      const existingItem = cart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        toast.success(`${item.name} quantity increased!`);
      } else {
        cart.push({ ...item, quantity: 1 });
        toast.success(`${item.name} added to cart!`);
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      //  Update cart count
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);

    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  return (
    <div className="menu-page">

      {/*  Search */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items…"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn"><FaSearch /></button>
        </div>
      </div>

      {/*  Categories */}
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Menu */}
      <div className="menu-container">
        <div className="menu-grid">
          {filteredItems.length === 0 ? (
            <p>No items found</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="menu-item">
                <img src={item.image} alt={item.name} className="menu-item-image" />

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{Number(item.price).toFixed(2)}</p>

                  <div className="item-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(item.rating || 0))}
                      {'☆'.repeat(5 - Math.floor(item.rating || 0))}
                    </span>
                    <span className="rating-value">{item.rating}</span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
      {cartCount > 0 && (
        <Link to="/Checkout" className="cart-floating-btn">
          Place order
          <FaShoppingCart size={24} />
         
        </Link>
      )}

    </div>
  );
};

export default Menu;