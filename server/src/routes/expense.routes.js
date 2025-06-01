const express = require("express");
const {
  createExpense,
  deletedExpense,
  getBudgetExpenses,
} = require("../controllers/expense.controller.js");

const router = express.Router();

router.post("/create", createExpense);
router.delete("/", deletedExpense);
router.get("/", getBudgetExpenses);

module.exports = router;
