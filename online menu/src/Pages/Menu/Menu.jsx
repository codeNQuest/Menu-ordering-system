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

  // Fetch menu from backend on mount
  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      console.log('Response status:', res.status, res.statusText);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Fetched menu items:', data);
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchMenu();
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

  const addToCart = (item) => {
    try {
      const raw = localStorage.getItem('cart');
      const cart = raw ? JSON.parse(raw) : [];
      
      // Check if item already exists in cart - use _id from MongoDB
      const existingItem = cart.find(cartItem => cartItem._id === item._id);
      
      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        toast.success(`${item.name} quantity increased!`);
      } else {
        // Add new item with quantity 1
        cart.push({ ...item, quantity: 1 });
        toast.success(`${item.name} added to cart!`);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  return (
    <div className="menu-page">
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items…"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" />
          <button className="search-btn"><FaSearch /></button>
        </div>
        <button className="cart-btn"><Link to="/Checkout"><FaShoppingCart color="Black" size={24} /></Link></button>
      </div>

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
                    <span className="stars">{'★'.repeat(Math.floor(item.rating || 0))}{'☆'.repeat(5 - Math.floor(item.rating || 0))}</span>
                    <span className="rating-value">{item.rating}</span>
                  </div>
                  <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
