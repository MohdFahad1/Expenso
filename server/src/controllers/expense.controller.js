const Expense = require("../models/expense.model.js");

const createExpense = async (req, res) => {
  let { name, amount, budgetId, userId } = req.body;

  try {
    if (!name || !budgetId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Name, Amount, BudgetId & UserId are required",
      });
    }

    if (typeof name === "string") {
      name = name.trim().toLowerCase();
    }

    const existingExpense = await Expense.findOne({ name, budgetId });

    if (existingExpense) {
      return res.status(400).json({
        success: false,
        message: "Expense with this name already exists",
      });
    }

    const newExpense = new Expense({
      name,
      amount,
      budgetId,
      userId,
    });

    await newExpense.save();

    return res.status(201).json({
      success: true,
      message: "New Expense Created",
      newExpense,
    });
  } catch (error) {
    console.error("Error Creating Expense:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
};
