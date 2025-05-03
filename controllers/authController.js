const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Register user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Respond with success
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    // Handle error
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with success
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    // Handle error
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
