const UserProgress = require("../models/UserProgress");

// Update user progress after each question
const updateProgress = async (req, res) => {
  const { userId, category, isCorrect } = req.body;

  try {
    // Find or create user progress for the category
    let progress = await UserProgress.findOne({ userId, category });

    if (!progress) {
      progress = new UserProgress({ userId, category });
    }

    // Update progress based on the answer
    if (isCorrect) {
      progress.correctAnswers += 1;
    } else {
      progress.wrongAnswers += 1;
    }

    progress.totalQuestionsAttempted += 1;
    progress.questionIndex += 1; // Move to the next question

    await progress.save();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// Get user progress for a specific category
const getProgress = async (req, res) => {
  const { userId, category } = req.params;

  try {
    const progress = await UserProgress.findOne({ userId, category });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

module.exports = { updateProgress, getProgress };