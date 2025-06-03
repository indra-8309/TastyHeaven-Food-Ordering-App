const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  CategoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: { type: Array, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('food_datas', foodItemSchema);
