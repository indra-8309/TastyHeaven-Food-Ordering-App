// createAdmin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admins"); // Adjust path if needed

mongoose.connect("mongodb+srv://test:test@cluster0.oegwxzv.mongodb.net/Tasty_Heaven", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  const name = "Admin Pravallika";
  const email = "admin@tastyheaven.com";
  const plainPassword = "admin";
  // const name = "Team5";
  // const email = "team@tastyheaven.com";
  // const plainPassword = "team5";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const admin = new Admin({
    name,
    email,
    password: hashedPassword,
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  mongoose.disconnect();
};

createAdmin().catch((err) => {
  console.error("❌ Error creating admin:", err);
  mongoose.disconnect();
});
