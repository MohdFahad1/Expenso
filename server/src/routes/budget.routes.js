const express = require("express");
const { createBudget } = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/create", createBudget);

module.exports = router;
