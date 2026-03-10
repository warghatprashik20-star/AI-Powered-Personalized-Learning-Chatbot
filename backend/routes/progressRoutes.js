const express = require("express");
const router = express.Router();

const {
  saveProgress,
  getProgress,
} = require("../controllers/progressController");

// Save or update student progress
router.post("/save", saveProgress);

// Get progress by userId
router.get("/:userId", getProgress);

module.exports = router;
