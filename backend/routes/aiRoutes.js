const express = require("express");
const router = express.Router();

const { chatAI, generateQuiz } = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

// AI tutor chat endpoint (protected)
router.post("/chat", protect, chatAI);

// Quiz generator endpoint (protected)
router.post("/generate-quiz", protect, generateQuiz);

module.exports = router;
