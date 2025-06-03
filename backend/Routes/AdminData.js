const express = require('express');
const router = express.Router();
const food_datas = require('../models/food_datas');
const food_categories = require('../models/food_categories');

// Route: POST /api/admin/addproduct
router.post('/addproduct', async (req, res) => {
  try {
    const { CategoryName, name, img, options, description } = req.body;

    // Save into food_items collection
    const product = new food_datas({
      CategoryName,
      name,
      img,
      options,
      description
    });

    await product.save();

    // Check if Category exists, if not create
    const categoryExist = await food_categories.findOne({ CategoryName });
    if (!categoryExist) {
      const newCategory = new food_categories({ CategoryName });
      await newCategory.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
