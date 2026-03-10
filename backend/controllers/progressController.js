const Progress = require("../models/Progress");

// ==========================================
// Save student progress
// POST /api/progress/save
// ==========================================
exports.saveProgress = async (req, res) => {
  try {
    const { userId, completedLessons, quizScores, accuracy, learningStreak } =
      req.body;

    // Validate required field
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Update existing progress or create new record (upsert)
    const progress = await Progress.findOneAndUpdate(
      { userId },
      {
        completedLessons,
        quizScores,
        accuracy,
        learningStreak,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==========================================
// Get student progress by userId
// GET /api/progress/:userId
// ==========================================
exports.getProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find progress record for this user
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
