// controllers/foods.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index route
router.get('/', async (req, res) => {
    console.log('Index route hit');
    try {
      const user = await User.findById(req.params.userId);
      res.render('foods/index', { pantry: user.pantry, user: req.session.user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
// New route
router.get('/new', (req, res) => {
  res.render('foods/new');
});

// Create route
router.post('/', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.push(req.body);
  await user.save();
  res.redirect(`/users/${req.params.userId}/foods`);
});

// Edit route
router.get('/:itemId/edit', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const item = user.pantry.id(req.params.itemId);
  res.render('foods/edit', { item });
});

// Update route
router.put('/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const item = user.pantry.id(req.params.itemId);
  item.set(req.body);
  await user.save();
  res.redirect(`/users/${req.params.userId}/foods`);
});

// Delete route
router.delete('/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.id(req.params.itemId).remove();
  await user.save();
  res.redirect(`/users/${req.params.userId}/foods`);
});

module.exports = router;
