
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "./App.css";
import Image from "./assets/home.jpeg";
import CheckoutPage from "./Pages/Checkout/Checkout.jsx";
import AdminPage from "./Pages/admin/AdminPage.jsx";
import AdminLogin from "./Pages/admin/AdminLogin.jsx";
import AdminMenu from "./Pages/admin/AdminMenu.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import AdminSettings from "./Pages/admin/AdminSettings.jsx";
import Menu from "./Pages/Menu/Menu.jsx";
import ChefPov from "./Pages/Chef/Chef.jsx";
import ChangePassword from "./Pages/admin/ChangePassword.jsx";
import About from "./Pages/others/About.jsx";
import Feedback from "./Pages/others/feedback.jsx";

import {
  CiLocationOn,
  CiMail,
  CiPhone
} from "./icons.js";

function HomePage() {
  return (
    <div className="page fade-in">
      <div className="app">
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

            {/* ✅ Buttons Fixed */}
            <div className="hero-buttons">
              <Link to="/menu" className="btn primary">
                Order Now
              </Link>

              <Link to="/feedback" className="btn outline">
                Feedback
              </Link>
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
          <p>© 2026 deliciousbites. All rights reserved.</p>
          <div id="contact" className="footer-contact">
            <a href="tel:+91100">
              <CiPhone /> Call Us
            </a>
            <a href="mailto:info@deliciousbites.com">
              <CiMail /> Email
            </a>
            <a href="#">
              <CiLocationOn /> Location
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  // Hide navbar on admin pages
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/Admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/adminsettings" element={<AdminSettings />} />
        <Route path="/adminchangepass" element={<ChangePassword />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adminchef" element={<ChefPov />} />
      </Routes>
    </>
  );
}

export default App;