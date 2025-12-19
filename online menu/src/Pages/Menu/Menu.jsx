import { useState } from "react";
import './Menu.css';
import toast from 'react-hot-toast';

// Constants for menu data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    price: 200.00,
    image: "/images/pizza.png", // Assuming images are in public/images
    category: "Pizza"
  },
  {
    id: 2,
    name: "Burger",
    description: "Grilled chicken patty with lettuce, tomato, and mayo",
    price: 80.00,
    image: "/images/burger.png",
    category: "Burgers"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing and croutons",
    price: 50.00,
    image: "/images/salad.png",
    category: "Salads"
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and Parmesan cheese",
    price: 11.99,
    image: "/images/pasta.jpg",
    category: "Pasta"
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with vanilla frosting",
    price: 5.99,
    image: "/images/cake.jpg",
    category: "Desserts"
  },
  {
    id: 6,
    name: "French Fries",
    description: "Crispy golden fries with sea salt",
    price: 4.99,
    image: "/images/fries.jpg",
    category: "Fries"
  }
];

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const cartItem = { ...item, quantity };
    setCart([...cart, cartItem]);
    toast.success(`${item.name} added to cart!`);
    // You can integrate with a global cart state or context here
  };

  const updateQuantity = (id, qty) => {
    setQuantities({ ...quantities, [id]: qty });
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
    <div className="menu-container">
      <h1>Our Menu</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for items..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>
      <div className="menu-header">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">{item.price.toFixed(2)} Rs</p>
            <div className="quantity-selector">
              <label>Qty: </label>
              <input 
                type="number" 
                min="1" 
                value={quantities[item.id] || 1} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} 
                className="quantity-input"
              />
            </div>
            <button onClick={() => addToCart(item)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;