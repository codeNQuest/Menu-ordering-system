import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Our Restaurant</h1>
        <p>Serving Delicious Food Since 2015</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, our restaurant has been a beloved destination for
            food enthusiasts and families alike. What started as a small kitchen
            with a passion for quality cuisine has grown into a thriving
            establishment known for our exceptional service and mouthwatering
            dishes.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide our guests with an unforgettable dining
            experience by serving fresh, high-quality ingredients prepared with
            care and creativity. We believe that every meal should be a moment
            of joy and connection.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li>
              <strong>Quality:</strong> We source the finest ingredients and
              prepare every dish with excellence
            </li>
            <li>
              <strong>Hospitality:</strong> Your satisfaction is our top priority
            </li>
            <li>
              <strong>Innovation:</strong> We continuously improve our menu and
              service
            </li>
            <li>
              <strong>Community:</strong> We're committed to supporting local
              suppliers and giving back to our community
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            Our talented team of chefs, servers, and staff members are dedicated
            to making your dining experience memorable. With years of combined
            experience in the hospitality industry, we take pride in our
            personalized service and attention to detail.
          </p>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>
              <strong>Phone:</strong> +91 1234567890
            </p>
            <p>
              <strong>Email:</strong> delicious@restaurant.com
            </p>
            <p>
              <strong>Address:</strong> Hiranandani,Mumbai, Maharashtra – 400076
            </p>
            <p>
              <strong>Hours:</strong> Mon-Sun 9:00 AM - 10:00 PM
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Order?</h2>
        <p>Experience our delicious menu today</p>
        <Link to="/menu" className="cta-button">
          View Menu
        </Link>
      </section>
    </div>
  );
};

export default About;
