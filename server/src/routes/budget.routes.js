const express = require("express");
const {
  createBudget,
  singleBudget,
  allBudgets,
  updateBudget,
  deleteBudget,
} = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/create", createBudget);
router.get("/", singleBudget);
router.get("/all", allBudgets);
router.put("/update", updateBudget);
router.delete("/", deleteBudget);

module.exports = router;
