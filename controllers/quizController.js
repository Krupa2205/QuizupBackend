const Question = require("../models/Question");

const getQuestions = async (req, res) => {
  try {
    const { category } = req.params; // Get category from URL
    console.log("Requested category:", category); // Debugging line

    const questions = await Question.find({ category: category });

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found in this category" });
    }

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getQuestions };
