const express = require('express');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URL)  
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('DB error:', err);
  });


app.get('/', (req, res) => {
  res.send('bacened ki');
});

app.get('/admin', async (req, res) => {
  try {
    const admin = new Admin({
      username: 'admin1',
      password: '1234'
    });

    await admin.save();
    res.send('Admin saved');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving admin');
  }
});



app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login success', adminId: admin._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});












const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});
