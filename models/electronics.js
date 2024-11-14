// models/electronics.js
const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

module.exports = mongoose.model('Electronics', electronicsSchema);
