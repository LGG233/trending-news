const express = require('express');
const router = express.Router();

const { ApiService } = require('../services');

router.get('', async (req, res) => {
  try {
    const headers = { Authorization: `${req.get('Authorization')}` };
    const userInfoResponse = await ApiService.get(`${process.env.AWS_COGNITO_BASE_URL}/oauth2/userInfo`, { headers });
    const { email, username } = userInfoResponse.data;
    res.json({ email, username });
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
