import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import "./AdminPage.css";
import toast from "react-hot-toast";



import adminPic from "../../assets/avatar_food.png";

function AdminSettings() {
  const [loginCount, setLoginCount] = useState(6);

  // ✅ STATES FOR FORM
  const [restaurantName, setRestaurantName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // ✅ FETCH LOGIN COUNT
  useEffect(() => {
    const fetchLoginCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/login-logs");
        const data = await res.json();
        setLoginCount(data.total || 0);
      } catch (err) {
        console.error("LOGIN COUNT ERROR", err);
      }
    };

    fetchLoginCount();
  }, []);

  // ✅ LOAD SETTINGS
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/settings");
        if (!res.ok) return;

        const data = await res.json();

        setRestaurantName(data.restaurantName || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setCity(data.city || "");
        setCuisine(data.cuisine || "");
        setUsername(data.username || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("SETTINGS LOAD ERROR", err);
      }
    };

    fetchSettings();
  }, []);

  // ✅ SAVE SETTINGS
  const handleSave = async () => {
    try {
      const payload = {
        restaurantName,
        phone,
        address,
        city,
        cuisine,
        username,
        email,
      };

      const res = await fetch(`${API_URL}/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="allpage">
      <AdminNavbar />

      <div className="setting-box">
        <h2>setting</h2>

        {/* Profile Section */}
        <div className="setting-box1">
          <div className="setting-row">
            <img src={adminPic} alt="admin-pic" className="setting-avatar" />
            <h3>Admin</h3>
            <h4>{email || "admin@email.com"}</h4>

            <Link to="/adminchangepass" className="setting-btn">
              Change Password
            </Link>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="setting-simple">
          <h3>Restaurant Information</h3>

          <div className="form-row1">
            <label>Restaurant name</label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </div>

          <div className="form-row2">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-row1">
            <label>Address</label>
            <input
              type="text"
              placeholder="Street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-row2">
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-row1">
            <label>Cuisine Type</label>
            <input
              type="text"
              placeholder="e.g., Italian, Indian, Chinese"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
        </div>

        {/* Account Settings */}
        <div className="setting-simple">
          <h3>Account Settings</h3>

          <div className="form-row1">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-row2">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row1">
            <label>Account Status</label>
            <input type="text" value="Active" disabled />
          </div>
        </div>

        {/* Security */}
        <div className="setting-simple">
          <h3>Account Security</h3>
          <div className="security-info">
            <p>Last login: Today</p>
            <p>Active devices: {loginCount}</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="setting-simple">
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;