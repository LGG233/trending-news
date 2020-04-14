const express = require('express');
const router = express.Router();
const { ApiService } = require('../services');
const User = require('../database/models/user');

router.get('/', async (req, res, next) => {
  // validate auth token (return 401 if invalid)
  const userInfoResponse = await ApiService.get(`${process.env.AWS_COGNITO_BASE_URL}/oauth2/userInfo`, {
    headers: { Authorization: `${req.get('Authorization')}` },
  }).catch((error) => {
    res.sendStatus(401);
    next(JSON.stringify(error.response.data));
  });

  // if authorization fails, exit function
  if (!userInfoResponse) return;

  // get username & email from valid token response
  const { username, email } = userInfoResponse.data;

  // return user data from DB (create if necessary, return 500 on error)
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = await new User({ username, email }).save();
    }
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

module.exports = router;
