const express = require('express');
const router = express.Router();
const { ApiService } = require('../services');
const User = require('../database/models/user');

router.get('/', async (req, res) => {
  // validate auth token (return 401 if invalid)
  const headers = { Authorization: `${req.get('Authorization')}` };
  const url = `${process.env.AWS_COGNITO_BASE_URL}/oauth2/userInfo`;
  const userInfoResponse = await ApiService.get(url, { headers }).catch(() => res.sendStatus(401));

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
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
