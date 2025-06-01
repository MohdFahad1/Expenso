const express = require("express");
const {
  createBudget,
  singleBudget,
} = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/create", createBudget);
router.get("/", singleBudget);

module.exports = router;
