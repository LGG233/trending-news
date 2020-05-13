const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.get('/', async (req, res, next) => {
  if (!req.query.email) return res.status(400).send('Missing email');
  try {
    let user = await User.findOne({ email: req.query.email });
    if (!user) return res.status(404).send('User does not exist');
    return res.json({ username: user.get('username') });
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

module.exports = router;
