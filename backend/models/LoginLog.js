const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  username: { type: String, required: true },
  ipAddress: String,
  userAgent: String,
  loggedInAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
