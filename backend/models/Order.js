const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  tableNumber: Number,
  paymentMethod: {
    type: String,
    enum: ['counter', 'online'],
    default: 'counter'
  },
  items: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
