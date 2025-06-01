const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const authRoutes = require("./routes/user.routes.js");
const budgetRoutes = require("./routes/budget.routes.js");
const expenseRoutes = require("./routes/expense.routes.js");

dotenv.config();

const app = express();

app.use(express.json());

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

app.use("/api/users", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expense", expenseRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
