const mongoose = require("mongoose");
const { Schema } = mongoose;

const BudgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emoji: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);
