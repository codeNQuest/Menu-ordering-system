const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Pizza', 'Burgers', 'Salads', 'Pasta', 'Desserts', 'Fries', 'Drinks']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema, 'menu');
