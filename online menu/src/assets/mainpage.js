function mainpage() {
  return (
    <div className="card-container">
      <img
        src="C:\Users\Aamna Ansari\OneDrive\Desktop"
        className="card-image"
        alt="Food"
      />

      <div className="card-content">
        <h1>Welcome to<br />Delicious Bites!</h1>

        <div className="buttons">
          <button className="order">Order Now</button>
          <button className="menu">View Menu</button>
          <button className="reserve">Reserve a Table</button>
        </div>
      </div>
    </div>
  );
}

export default mainpage;