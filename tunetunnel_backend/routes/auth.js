const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helper');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, userName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = { firstName, lastName, email, password: hashedPassword, userName };
    const newUser = await User.create(newUserData);

    // Generate JWT token
    const token = await getToken(email, newUser);

    // Prepare user object to return
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email not registered" });
    }
    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Generate the token
    const token = await getToken(user.email, user);

    // Prepare the user object to return
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error during login:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
