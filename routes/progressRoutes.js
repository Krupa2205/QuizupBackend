const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress"); // Ensure you import your model

router.post("/update", async (req, res) => {
  console.log("Received Request Body:", req.body); // Debugging

  const { userId, category, isCorrect } = req.body;

  if (!userId || !category || isCorrect === undefined) {
    console.error("Missing required fields in request body");
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("Searching for progress for user:", userId, "and category:", category);
    let progress = await UserProgress.findOne({ userId, category });

    if (!progress) {
      console.log("No progress found. Creating new progress document.");
      progress = new UserProgress({ userId, category });
    }

    if (isCorrect) {
      console.log("Updating correct answers");
      progress.correctAnswers += 1;
    } else {
      console.log("Updating wrong answers");
      progress.wrongAnswers += 1;
    }

    console.log("Updating total questions attempted");
    progress.totalQuestionsAttempted += 1;

    console.log("Saving progress:", progress);
    await progress.save();

    console.log("Progress saved successfully");
    res.status(200).json(progress); // Return the updated progress
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

module.exports = router; // Export the router