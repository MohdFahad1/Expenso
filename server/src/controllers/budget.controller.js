const Budget = require("../models/budget.model.js");

const createBudget = async (req, res) => {
  try {
    let { name, userId, emoji, amount } = req.body;

    if (!name || !userId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Name, Amount & userId required",
      });
    }

    const cleanName = name.trim().toLowerCase();

    const existingBudget = await Budget.findOne({
      name: cleanName,
      userId,
    });

    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message: "Budget with this name already exists",
      });
    }

    const newBudget = new Budget({
      name: cleanName,
      userId,
      emoji,
      amount,
    });

    await newBudget.save();

    return res.status(201).json({
      success: true,
      message: "Budget Created",
      newBudget,
    });
  } catch (error) {
    console.error("Error Creating Budget: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const singleBudget = async (req, res) => {
  try {
    const { budgetId } = req.query;

    if (!budgetId) {
      return res.status(400).json({
        success: false,
        message: "Budget ID must be provided",
      });
    }

    const budgetData = await Budget.findById(budgetId);

    if (!budgetData) {
      return res.status(404).json({
        success: false,
        message: "No Budget found",
      });
    }

    return res.status(200).json({
      success: true,
      budgetData,
    });
  } catch (error) {
    console.error("Error Fetching Budgets: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const allBudgets = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID must be provided",
      });
    }

    const budgets = await Budget.find({ userId });

    if (!budgets || budgets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No budgets found",
      });
    }

    return res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    console.error("Error Fetching Budgets: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { name, amount, emoji, budgetId, userId } = req.body;

    if (!budgetId) {
      return res.status(400).json({
        success: false,
        message: "Budget ID must be provided",
      });
    }

    const updateFields = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (emoji !== undefined) updateFields.emoji = emoji;
    if (amount !== undefined) updateFields.amount = amount;
    if (userId !== undefined) updateFields.userId = userId;

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (userId && budget.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this budget",
      });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      updateFields,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Budget Updated",
      updatedBudget,
    });
  } catch (error) {
    console.error("Error Updating Budget: ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteBudget = async (req, res) => {
  const { budgetId } = req.query;
  try {
    if (!budgetId) {
      console.error("Missing budgetId:", budgetId);
      return res.status(400).json({
        success: false,
        message: "BudgetId is required",
      });
    }

    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      console.error("No budget found with ID:", budgetId);
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    console.log("Budget deleted successfully:", deletedBudget);

    return res.status(200).json({
      success: true,
      message: "Budget Deleted",
    });
  } catch (error) {
    console.error("Error Deleting Budget:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createBudget,
  singleBudget,
  allBudgets,
  updateBudget,
  deleteBudget,
};
