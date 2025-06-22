const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // Use from .env

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
