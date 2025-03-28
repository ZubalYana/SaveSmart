const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  },
});

const upload = multer({ storage });

//register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, subscribed, heardFrom, purposeOfUsage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: name,
      email,
      password: hashedPassword,
      dateOfBirth,
      subscribedToNewsletter: subscribed,
      heardFrom,
      purposeOfUsage,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get user info
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.username,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      subscribedToNewsletter: user.subscribedToNewsletter,
      heardFrom: user.heardFrom,
      purposeOfUsage: user.purposeOfUsage,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user info", error: error.message });
  }
});


//upload profile picture
router.post("/upload-profile", authenticateToken, upload.single("profilePicture"), async (req, res) => {
  try {
    console.log("📩 Received request to upload profile picture");

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("✅ Uploaded file:", req.file);

    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = req.file.path;
    await user.save();

    console.log("✅ Profile picture updated:", user.profilePicture);
    return res.json({ message: "Profile picture updated", profilePicture: user.profilePicture });

  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});




module.exports = router;
