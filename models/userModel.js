const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  profilePhoto: { type: String, default: 'https://via.placeholder.com/150' },
  aboutBio: { type: String, default: 'Write about yourself here...' },
  skills: [String],
  socialLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    github: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  basicInfo: {
    name: { type: String },
    username: { type: String },
    birthDate: { type: Date },
    location: { type: String },
    organization: { type: String },
    website: { type: String },
    phone: { type: String },
    preferredLanguage: { type: String }
  },
  experience: [{
    position: { type: String },
    type: { type: String, default: 'Frontend' },
    details: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
