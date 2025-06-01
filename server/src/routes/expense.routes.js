const express = require("express");
const {
  createExpense,
  deletedExpense,
} = require("../controllers/expense.controller.js");

const router = express.Router();

router.post("/create", createExpense);
router.delete("/", deletedExpense);

module.exports = router;
