const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');              // <-- NEW
const Admin = require('./models/Admin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error:', err));


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // verify
    req.adminId = decoded.adminId; // save id for later
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Test route
app.get('/', (req, res) => {
  res.send('backend ok');
});

// Login: now returns JWT
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { adminId: admin._id },                 // payload
      process.env.JWT_SECRET,                 // secret
      { expiresIn: '1h' }                     // token valid for 1 hour
    );                                        // [web:132][web:134][web:143]

    res.json({ message: 'Login success', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/admin/profile', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Error loading profile' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});
