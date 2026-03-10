const mongoose = require("mongoose");

// Schema to track each student's learning progress
const progressSchema = new mongoose.Schema(
  {
    // Reference to the user this progress belongs to
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Total number of lessons the student has completed
    completedLessons: {
      type: Number,
      default: 0,
    },

    // Array of quiz scores (each entry is a percentage)
    quizScores: {
      type: [Number],
      default: [],
    },

    // Overall accuracy across all quizzes
    accuracy: {
      type: Number,
      default: 0,
    },

    // Consecutive days the student has been active
    learningStreak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", progressSchema);
