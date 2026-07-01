import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "../../icons.js";
import "./Adminmenu.css";
import AdminNavbar from "../../components/AdminNavbar.jsx";

const API_URL = "http://localhost:5000/api";

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Burgers",
  });

  const categories = [
    "All",
    "Burgers",
    "Pizza",
    "Fries",
    "Desserts",
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      setMenuItems(data || []);
    } catch (err) {
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Burgers",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Fill required fields");
      return;
    }

    try {
      const res = await fetch(
        editingId
          ? `${API_URL}/menu/${editingId}`
          : `${API_URL}/menu`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error();
      toast.success(editingId ? "Item updated" : "Item added");
      setShowModal(false);
      fetchMenuItems();
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await fetch(`${API_URL}/menu/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      fetchMenuItems();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const getCategoryCount = (cat) => {
    if (cat === "All") return menuItems.length;
    return menuItems.filter((item) => item.category === cat).length;
  };

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1>Admin Panel</h1>
            <p>Menu Management</p>
          </div>
          <button className="btn-add-item" onClick={openAddModal}>
            <span>+</span> Add Item
          </button>
        </div>

        <div className="dashboard-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`dashboard-chip ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ({getCategoryCount(cat)})
            </button>
          ))}
        </div>

        <div className="dashboard-list">
          {loading ? (
            <p className="dashboard-loading">Loading...</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="dashboard-card">
                <img src={item.image} alt={item.name} />

                <div className="dashboard-info">
                  <h3>{item.name}</h3>
                  <span className="dashboard-category">
                    {item.category}
                  </span>
                  <p>{item.description}</p>
                  <div className="dashboard-price">
                    ₹{Number(item.price).toFixed(2)}
                  </div>
                </div>

                <div className="dashboard-actions">
                  <MdEdit
                    className="edit-icon"
                    onClick={() => handleEdit(item)}
                  />
                  <MdDelete
                    className="delete-icon"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{editingId ? "Edit Item" : "Add Item"}</h2>

              <form onSubmit={handleSubmit} className="modal-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                </select>

                <button type="submit" className="btn-submit">
                  {editingId ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminMenu;