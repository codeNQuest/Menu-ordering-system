import React from 'react'
import './App.css'
import Image from './assets/photo.jpg'

function App() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <i className="fa-solid fa-utensils"></i>
          <span>RESTAURANT</span>
        </div>

        <div className="menu">
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>

      {/* Hero card */}
      <div className="card-container">
        <img
          src={Image}
          className="card-image"
          alt="Food"
        />

        <div className="card-content">
          <h1>
            Welcome to
            <br />
            Delicious Bites!
          </h1>

          <div className="buttons">
            <button className="order">Order Now</button>
            <button className="menu-btn">View Menu</button>
            <button className="reserve">Reserve a Table</button>
          </div>
          <br />
          <div id="offer">
            <h2>Special Offer!</h2>
            <p>
              Get 60% off on your first order. Use code:
              <b> FIRST20 </b>
              at checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer">
        <footer>
          <b>About Us</b>
          <br />
          We are passionate about delivering the best dining experience,
          with delicious food and exceptional service.
          <div id="contact">
            <a href="#">Contact</a>
            <a href="#">Social</a>
            <a href="#">Terms</a>
            <a href="#">Help</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
