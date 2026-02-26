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
  methods: ["GET", "POST", "PATCH", "DELETE"],
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
 /* Menu Api */
app.get('/api/menu', async (req, res) => {
  try {
    console.log('Fetching menu items from DB...');
    const menuItems = await Menu.find();
    console.log('Found menu items:', menuItems.length);
    console.log('Items:', menuItems);
    res.json(menuItems);
  } catch (err) {
    console.error('MENU FETCH ERROR:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* Orders Api */
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Creating order:', req.body);
    
    // Generate a unique order number
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    const orderData = {
      ...req.body,
      orderNumber
    };
    
    const order = await Order.create(orderData);
    console.log('Order created:', order._id);
    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: order._id,
      orderNumber: order.orderNumber,
      order 
    });
  } catch (err) {
    console.error('ORDER CREATE ERROR:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('ORDERS FETCH ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('ORDER FETCH ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
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
    console.error('ORDER UPDATE ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/admin/login-logs/count', async (req, res) => {
  try {
    const total = await LoginLog.countDocuments(); 
    return res.json({ total });
  } catch (err) {
    console.error('LOGIN LOG COUNT ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('LOGIN BODY:', req.body);

  try {
    const admin = await Admin.findOne({ username, password });
    console.log('FOUND ADMIN:', admin);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // save login history
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
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// get login history (you can later protect this with auth)
app.get('/admin/login-logs', async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ loggedInAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error('LOGIN LOGS ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});
