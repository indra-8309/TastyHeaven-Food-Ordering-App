const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://test:test@cluster0.oegwxzv.mongodb.net/Tasty_Heaven";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
