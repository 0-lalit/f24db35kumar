// models/electronics.js
const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
  name: {type: String, required: true },
  category: {type: String, required: true },
  price: { 
    type: Number, 
    required: true,
    min: [300, 'price must be at least 300.'],
    max: [50000, 'price cannot exceed 50000.']
  }
});

module.exports = mongoose.model('Electronics', electronicsSchema);
