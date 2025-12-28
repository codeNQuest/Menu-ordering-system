import React, { useState } from "react";
import "./Cart.css";
import{FaShoppingCart } from "../../icons"
function cart() {
  const [items, setItems] = useState([]);     // list
  const [text, setText] = useState("");       // input
  const [editIndex, setEditIndex] = useState(null); // konsa edit ho raha

  // ✅ CREATE & UPDATE (same button)
  const addOrUpdateItem = () => {
    if (editIndex === null) {
      // CREATE
      setItems([...items, text]);
    } else {
      // UPDATE
      const updatedItems = [...items];
      updatedItems[editIndex] = text;
      setItems(updatedItems);
      setEditIndex(null);
    }
    setText("");
  };

  // ✅ DELETE
  const deleteItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  // ✅ EDIT (UPDATE start)
  const editItem = (index) => {
    setText(items[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h2>Simple CRUD</h2>

      {/* CREATE / UPDATE */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addOrUpdateItem}><FaShoppingCart />
        {editIndex === null ? "Add" : "Update"}
      </button>

      {/* READ */}
      {items.map((item, index) => (
        <div key={index}>
          {item}
          <button onClick={() => editItem(index)}>Edit</button>
          <button onClick={() => deleteItem(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default cart; 
 