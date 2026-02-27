const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Admin = require('./models/Admin');
const LoginLog = require('./models/LoginLog');
const Menu = require('./models/Menu');
const Order = require('./models/Order');
require('dotenv').config();

const app = express();

// FIXED CORS - THIS SOLVES FRONTEND ISSUE
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error:', err));

app.get('/', (req, res) => {
  res.send('backend ok');
});

/* ================= MENU API ================= */

app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.image || !req.body.category) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        error: 'name, price, image, and category are required'
      });
    }

    const menuData = {
      name: req.body.name.trim(),
      price: parseFloat(req.body.price),
      category: req.body.category,
      image: req.body.image.trim(),
      description: req.body.description?.trim() || '',
      rating: parseFloat(req.body.rating) || 4.5
    };

    const newItem = await Menu.create(menuData);

    res.status(201).json({ 
      message: 'Menu item added successfully',
      item: newItem 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ 
      message: 'Menu item updated successfully',
      item: updatedItem 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ 
      message: 'Menu item deleted successfully',
      item: deletedItem 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ================= ORDERS API ================= */

app.post('/api/orders', async (req, res) => {
  try {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      ...req.body,
      orderNumber
    };

    const order = await Order.create(orderData);

    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: order._id,
      orderNumber: order.orderNumber,
      order 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, completedAt: status === 'completed' ? new Date() : undefined },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* ================= ADMIN LOGIN ================= */

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    await LoginLog.create({
      userId: admin._id,
      username: admin.username,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.json({
      message: 'Login success',
      adminId: admin._id,
      username: admin.username,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ================= CHANGE PASSWORD (ADDED) ================= */

app.put('/admin/change-password', async (req, res) => {
  const { adminId, currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== currentPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    return res.json({ message: 'Password updated successfully' });

  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ================= LOGIN LOGS ================= */

app.get('/admin/login-logs', async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ loggedInAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});