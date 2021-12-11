const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true],
  },
  goals: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const userGoal = mongoose.model("accomplishments", goalSchema);

module.exports = userGoal;
