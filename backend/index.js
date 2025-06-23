const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const cors = require("cors");

mongoDB();

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000", // for local development
  "https://tastyheaven4.netlify.app" // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Pravallika ------");
});

// Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/AdminLogin"));
app.use("/api/admin", require("./Routes/AdminData"));

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
