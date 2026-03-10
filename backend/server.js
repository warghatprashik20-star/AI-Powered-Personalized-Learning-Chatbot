// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import route modules
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const progressRoutes = require("./routes/progressRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB database
connectDB();

// ==========================================
// Middleware Setup
// ==========================================
app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// ==========================================
// API Routes
// ==========================================
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/ai", aiRoutes); // AI tutor & quiz routes
app.use("/api/progress", progressRoutes); // Student progress routes

// Root route – health check
app.get("/", (req, res) => {
  res.json({ status: "AI Tutor Backend Running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
