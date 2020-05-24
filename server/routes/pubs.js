const express = require('express');
const router = express.Router();
// const { ApiService } = require('../services');
const Pub = require('../database/models/pub');
const User = require('../database/models/user');

router.get('/', (req, res, next) => {
  Pub.find()
    .sort({ name: 1 })
    .then(function (dbPubs) {
      res.json(dbPubs);
    });
  // (error) => res.sendStatus(404)
  // );
});

router.post('/', (req, res, next) => {
  const username = req.user['cognito:username'];
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.sendStatus(500);
    } else if (!user) {
      console.log('400', user);
      res.sendStatus(400);
    } else {
      for (let i = 0; i < user.publications.length; i++)
        if (user.publications[i].twitterHandle === req.body.twitterHandle) {
          res.sendStatus(409);
          console.log('already in db');
          return;
        }
      console.log('200', user);
      console.log('User Publications: ', user.publications);
      console.log('Twitter Handle', req.body.twitterHandle);
      console.log('Name: ', user.name);
      User.updateOne(
        { username },
        {
          $push: {
            publications: {
              name: req.body.name,
              twitterHandle: req.body.twitterHandle,
            },
          },
        }
      ).then(function (user) {
        console.log(user);
        res.json(user);
      });
    }
  });
});

router.post('/pubs', (req, res, next) => {});

router.get('/searchPubTitle/:title', (params, res, next) => {
  var regex = new RegExp(params.params.title, 'i');
  Pub.find({ name: regex }).then(function (dbTitle) {
    res.json(dbTitle);
  });
});

router.get('/searchPubTwitter/:twitter', (params, res, next) => {
  var regex = new RegExp(params.params.twitter, 'i');
  Pub.find({ twitterHandle: regex }).then(function (dbTwitter) {
    res.json(dbTwitter);
  });
});

module.exports = router;
