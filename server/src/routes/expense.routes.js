const express = require("express");
const {
  createExpense,
  deletedExpense,
  getBudgetExpenses,
  getAllExpenses,
} = require("../controllers/expense.controller.js");

const router = express.Router();

router.post("/create", createExpense);
router.delete("/", deletedExpense);
router.get("/", getBudgetExpenses);
router.get("/all", getAllExpenses);

module.exports = router;
