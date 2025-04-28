// routes/profile.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

// Get Profile API (Protected)
router.get('/', authenticate, async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.user;

    res.status(200).json({
      name,
      email,
      phoneNumber,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update Profile API (Protected)
router.put('/', authenticate, async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    if (!name && !email && !phoneNumber) {
      return res.status(400).json({ message: 'Please provide name, email, or phone number to update.' });
    }

    if (name) req.user.name = name;
    if (email) req.user.email = email;
    if (phoneNumber) req.user.phoneNumber = phoneNumber;

    await req.user.save();

    res.status(200).json({
      message: 'Profile updated successfully.',
      user: {
        name: req.user.name,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
