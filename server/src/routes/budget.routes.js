const express = require("express");
const {
  createBudget,
  singleBudget,
  allBudgets,
  updateBudget,
} = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/create", createBudget);
router.get("/", singleBudget);
router.get("/all", allBudgets);
router.put("/update", updateBudget);

module.exports = router;
