const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true }
});

module.exports = mongoose.model('food_categories', foodCategorySchema);
