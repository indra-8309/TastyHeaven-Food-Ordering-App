const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const Admin = require("../models/Admins"); // Your admin model
const food_datas = require("../models/food_datas");

router.post("/loginadmin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, error: "Invalid Email" });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
      return res.status(400).json({ success: false, error: "Invalid Password" });
    }

    const data = {
        user: {
          id: admin.id,
          name: admin.name,  // Include the name
          email: admin.email, // Include the email
          role: 'admin',  // Include the role
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);


    res.json({
        success: true,
        authToken: authToken,
        userData: {
          name: admin.name,
          email: admin.email,
          role: 'admin', // Ensure role is also sent back if needed
        },
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update food item
router.put("/foodItem/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, img, options, description } = req.body;
    try {
      let food = await food_datas.findByIdAndUpdate(id, {
        name,
        img,
        options,
        description
      });
      res.json({ success: true, message: "Food updated" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Delete food item
  router.delete("/foodItem/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await food_datas.findByIdAndDelete(id);
      res.json({ success: true, message: "Food deleted" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
  

module.exports = router;
