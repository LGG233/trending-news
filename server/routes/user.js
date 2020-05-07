const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.get('/', async (req, res, next) => {
  const username = req.user['cognito:username'];
  try {
    let user = await User.findOne({ username });
    if (!user) {
      const email = req.user.email;
      user = await new User({ username, email }).save();
    }
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

module.exports = router;
