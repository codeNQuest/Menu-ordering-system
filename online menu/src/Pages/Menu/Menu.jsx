import { useState } from "react";
import './Menu.css';
import toast from 'react-hot-toast';
import Navbar from "../../components/Navbar";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 199.00,
    image: "/images/pizza.png",
    category: "Pizza",
    rating: 4.5
  },
  {
    id: 2,
    name: "Burger",
    price: 89.00,
    image: "/images/burger.png",
    category: "Burgers",
    rating: 4.2
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 49.00,
    image: "/images/salad.png",
    category: "Salads",
    rating: 4.0
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: 299.00,
    image: "/images/pasta.png",
    category: "Pasta",
    rating: 4.7
  },
  {
    id: 5,
    name: "Chocolate Cake",
    price: 599,
    image: "/images/cake.png",
    category: "Desserts",
    rating: 4.8
  },
  {
    id: 6,
    name: "French Fries",
    price: 70.00,
    image: "/images/fries.png",
    category: "Fries",
    rating: 4.1
  }
];

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (item) => {
    const cartItem = { ...item, quantity: 1 };
    setCart([...cart, cartItem]);
    toast.success(`${item.name} added to cart!`);
    // You can integrate with a global cart state or context here
  };

  // Get unique categories
  const categories = ["All Items", "Pizza", "Burgers", "Salads", "Pasta", "Desserts", "Fries"];

  // Filter items based on selected category and search term
  let filteredItems = selectedCategory === "All Items" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (searchTerm) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="Main">
    <div className="menu-page">
      <div className="search-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for items…" 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"/>
          <button className="search-btn">🔍</button>
        </div>
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
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
                <div className="item-rating">
                  <span className="stars">{'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}</span>
                  <span className="rating-value">{item.rating}</span>
                </div>
                <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Menu;