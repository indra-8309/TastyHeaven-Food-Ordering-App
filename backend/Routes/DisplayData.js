const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/food_datas", async (req, res) => {
  try {
    // Fetch fresh data from MongoDB each time the request is made
    const food_datas = await mongoose.connection.db.collection("food_datas").find({}).toArray();
    const food_categories = await mongoose.connection.db.collection("food_categories").find({}).toArray();
    
    res.send([food_datas, food_categories]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
