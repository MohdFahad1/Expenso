const express = require("express");
const {
  createBudget,
  singleBudget,
  allBudgets,
} = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/create", createBudget);
router.get("/", singleBudget);
router.get("/all", allBudgets);

module.exports = router;
