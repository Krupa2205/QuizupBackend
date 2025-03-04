const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// 🚀 GET questions by category (e.g., "ReactJS")
router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category.trim(); 
    // console.log("🔍 Received category:", category); 

    // Case-insensitive search to avoid mismatch issues
    const questions = await Question.find({ category: new RegExp(`^${category}$`, "i") });

    if (!questions.length) {
      // console.log("⚠️ No questions found for category:", category);
      return res.status(404).json({ message: "No questions found in this category⚠️" });
    }

    console.log("✅ Questions found:", questions.length); // Log count
    res.json(questions);
  } catch (error) {
    // console.error("❌ Error fetching questions:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 🚀 POST - Add new question (for testing)
router.post("/", async (req, res) => {
  try {
    const { category, question, options, answer } = req.body;

    //  Validate required fields
    if (!category || !question || !options || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Question({ category, question, options, answer });
    await newQuestion.save();

    // console.log("✅ New question added:", newQuestion);
    res.status(201).json({ message: "Question added successfully!", question: newQuestion });
  } catch (error) {
    // console.error("❌ Error adding question:", error);
    res.status(500).json({ message: "Error adding question", error });
  }
});

module.exports = router;
