// controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.render('users/index', { users });
});

// Show route
router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render('users/show', { user });
});

module.exports = router;
