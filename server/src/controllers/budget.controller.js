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

module.exports = {
  createBudget,
};
