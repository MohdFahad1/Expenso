const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();

app.use(express.json());

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
