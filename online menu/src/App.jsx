/*abc*/
import { Routes, Route, useLocation} from "react-router-dom";
import "./App.css";
import Image from "./assets/photo.jpg";
import CheckoutPage from "./Pages/Checkout/Checkout.jsx";
import AdminPage from "./Pages/Admin/AdminPage.jsx";
import AdminLogin from "./Pages/admin/AdminLogin.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import  { Toaster } from "react-hot-toast";
import AdminSettings from "./Pages/admin/AdminSettings.jsx";
import Menu from "./Pages/Menu/Menu.jsx";
import ChefPov from "./Pages/Chef/Chef.jsx";
import ChangePassword  from "./Pages/admin/ChangePassword.jsx"
import {
 CiLocationOn,CiMail, CiPhone,FaHome
} from "./icons.js";
function HomePage() {


  return (
    <div className="page fade-in">
    <div className="app">
      <section id="home" className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <br /> Ashish Fast Food!
          </h1>
          <p>
            Special Offer! Get 60% off on your first order. Use code:
            <strong> FIRST20 </strong>
            at checkout.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Order Now</button>
            <button className="btn secondary">View Menu</button>
            <button className="btn outline" >Feedback </button>
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
          <a href="tel:+91"><CiPhone/>Call Us</a>
          <a href="mailto:info@deliciousbites.com"><CiMail/>Email</a>
          <a href="#l"><CiLocationOn />Location</a>
        </div>
      </footer>
    </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/Admin") ;

  return (
   <>
      {!hideNavbar && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/AdminChef" element={<ChefPov />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/AdminSettings" element={<AdminSettings />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/adminchangepass" element={<ChangePassword />} />
      </Routes>
   </>
  );
}

export default App;