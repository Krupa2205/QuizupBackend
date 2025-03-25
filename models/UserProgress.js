const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
  totalQuestionsAttempted: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserProgress", UserProgressSchema);