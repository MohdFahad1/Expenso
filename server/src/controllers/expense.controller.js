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

const deletedExpense = async (req, res) => {
  const { expenseId } = req.query;

  try {
    if (!expenseId) {
      return res.status(400).json({
        success: false,
        message: "Expense Id is required",
      });
    }

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense Deleted",
    });
  } catch (error) {
    console.error("Error Deleting Expense:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getBudgetExpenses = async (req, res) => {
  const { budgetId } = req.query;

  try {
    if (!budgetId) {
      return res.status(400).json({
        success: false,
        message: "Budget Id must be provided",
      });
    }

    const expenses = await Expense.find({ budgetId });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found",
      });
    }

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Error Fetching Expenses: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllExpenses = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const expenses = await Expense.find({ userId });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
  deletedExpense,
  getBudgetExpenses,
  getAllExpenses,
};
