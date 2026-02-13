import React, { useState } from "react";
import "./Feedback.css";


function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: send to backend with fetch/axios
    console.log("Feedback:", { name, message });
    alert("Thank you for your feedback!");
    setName("");
    setMessage("");
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div>
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Your Feedback</label>
          <textarea
            value={message}
            placeholder="Write your feedback..."
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
