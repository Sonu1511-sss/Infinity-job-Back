const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require("../controllers/authController");

// Register and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Update profile route
router.put("/profile/:userId", updateProfile);

module.exports = router;
