import { useState } from "react";
import './Menu.css';
import toast from 'react-hot-toast';

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 199.00,
    image: "/images/pizza.png",
    category: "Pizza",
    isVeg: true,
    rating: 4.5,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Burger",
    price: 89.00,
    image: "/images/burger.png",
    category: "Burgers",
    isVeg: false,
    rating: 4.2,
    isBestSeller: false
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 49.00,
    image: "/images/salad.png",
    category: "Salads",
    isVeg: true,
    rating: 4.0,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: 299.00,
    image: "/images/pasta.png",
    category: "Pasta",
    isVeg: false,
    rating: 4.7,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Chocolate Cake",
    price: 599,
    image: "/images/cake.png",
    category: "Desserts",
    isVeg: true,
    rating: 4.8,
    isBestSeller: false
  },
  {
    id: 6,
    name: "French Fries",
    price: 70.00,
    image: "/images/fries.png",
    category: "Fries",
    isVeg: true,
    rating: 4.1,
    isBestSeller: false
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
  const categories = ["All Items", ...new Set(menuItems.map(item => item.category))];

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
    <div className="menu-page">
      <header className="sticky-nav">
        <div className="nav-logo">
          <span className="logo-icon">🍽</span>
          <span>Ashish Fast Food</span>
        </div>
        <div className="nav-search">
          <input 
            type="text" 
            placeholder="Search for items..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"/>
        </div>
        <div className="nav-categories">
          {categories.map(category => (
            <button 
              key={category} 
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="menu-container">
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="menu-item-image" />
                {item.isBestSeller && <span className="best-seller">Best Seller</span>}
                <span className="veg-icon">{item.isVeg ? '🥬' : '🍖'}</span>
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-rating">
                  <pan className="stars">{'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}</pan>
                  <span className="rating-value">{item.rating}</span>
                </div>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;