// controllers/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Sign-up route
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  req.session.user = newUser;
  res.redirect(`/users/${newUser._id}/foods`);
});

// Sign-in route
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in');
});

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect(`/users/${user._id}/foods`);
  } else {
    res.redirect('/auth/sign-in');
  }
});

// Sign-out route
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
