import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Image from "./assets/photo.jpg";
import AdminPage from "./Pages/admin/AdminPage.jsx";
import AdminLogin from "./Pages/admin/AdminLogin.jsx";
import Cart from "./Pages/Cart/Cart.jsx";

function HomePage() {
  return (
    
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🍽</span>
          <span>ASHISH FAST FOOD</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          
          <li><Link to="./Cart">contact</Link></li>
          <li><Link to="./admin/AdminLogin">Login</Link></li>
        </ul>
      </nav>

      <section id="home" className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <br /> Delicious Bites!
          </h1>
          <p>
            Special Offer! Get 60% off on your first order. Use code:
            <strong> FIRST20 </strong>
            at checkout.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Order Now</button>
            <button className="btn secondary">View Menu</button>
            <button className="btn outline" onClick={Cart}>Reserve a Table</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={Image} alt="Delicious food" />
        </div>
      </section>

      <section id="offer" className="offer">
        <h2>Today&apos;s Special Combo</h2>
        <p>
          Enjoy a handcrafted meal with a complimentary drink and dessert.
          Limited time only!
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 ASHISH FAST FOOD. All rights reserved.</p>
        <div id="contact" className="footer-contact">
          <a href="tel:+91">📞Call Us</a>
          <a href="mailto:info@deliciousbites.com" >✉️Email</a>
          <a href="#l">📍Location</a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/AdminLogin" element={<AdminLogin/>} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
}

export default App;