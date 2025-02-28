const { register, login, logout } = require("../controllers/user.controller")
const User = require('../models/users.model')
const express = require('express')
const authMiddleware = require("../middleware/authMiddleware")

const router =  express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

// Get logged-in user
router.get('/me',authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;