const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "ThisisIndraSenaReddyFromAndhraPr";

router.post("/creatuser", async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    // Check for existing user by email
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exist" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Error signing up" });
  }
});

router.post(
  "/loginuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, errors: "Incorrect Email" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res.status(400).json({ success: false, errors: "Incorrect password" });
      }

      const data = {
        userData: {
          id: user.id,
          name: user.name,  // Include the name
          email: user.email, // Include the email
          role: 'Customer',  // Include the role
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      res.json({
        success: true,
        authToken: authToken,
        userData: {
          name: user.name,
          email: user.email,
          role: 'Customer', // Ensure role is also sent back if needed
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
