const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Admin = require('./models/Admin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB error:', err));


app.get('/', (req, res) => {
  res.send('backend ok');
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('LOGIN BODY:', req.body);   // log what frontend sends

  try {
    const admin = await Admin.findOne({ username, password });
    console.log('FOUND ADMIN:', admin);   // see what DB returns

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // only send simple JSON, nothing extra
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on', PORT);
});

