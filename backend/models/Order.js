const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Number
  orderNumber: {
    type: Number,
    unique: true,
    sparse: true
  },

  // Customer Information
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['guest', 'logged-in'],
    default: 'guest'
  },
  
  // Shipping Information
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight', 'pickup'],
    default: 'standard'
  },
  
  // Order Items
  items: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String
  }],
  
  // Price Information
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  discountCode: {
    type: String,
    default: null
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'debit-card', 'upi', 'net-banking', 'cod'],
    default: 'credit-card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    default: null
  },
  
  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  
  // Additional Info
  notes: {
    type: String,
    default: null
  },
  trackingNumber: {
    type: String,
    default: null
  }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
});

module.exports = mongoose.model('Order', orderSchema);
