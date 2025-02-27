const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  questionIndex: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserProgress", UserProgressSchema);
