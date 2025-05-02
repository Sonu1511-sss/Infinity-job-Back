const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Register
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { userId } = req.params; // Assume userId is passed in the URL
  const { profilePhoto, aboutBio, skills, socialLinks, basicInfo, experience } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile fields
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.aboutBio = aboutBio || user.aboutBio;
    user.skills = skills || user.skills;
    user.socialLinks = socialLinks || user.socialLinks;
    user.basicInfo = basicInfo || user.basicInfo;
    user.experience = experience || user.experience;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
