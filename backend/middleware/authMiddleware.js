const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes – verifies JWT token from Authorization header
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and has Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Extract and verify the JWT token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
