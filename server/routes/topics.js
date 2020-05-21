const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.post('/', (req, res, next) => {
    const username = req.user['cognito:username'];
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.sendStatus(500);
        } else if (!user) {
            console.log("400", user)
            res.sendStatus(400)
        } else if (user.topics.includes(req.body.entryTerm)) {
            console.log("409", user)
            res.sendStatus(409)
        } else {
            console.log("200", user)
            User.updateOne({ username },
                {
                    $push: { topics: req.body.entryTerm },
                }).then(function (user) {
                    console.log(user)
                    res.json(user);
                });
        }
    });
});

router.delete('/:name', (req, res, next) => {
    const username = req.user['cognito:username'];
    User.updateOne({ username }, { $pull: { topics: req.params.name } })
        .then(function (user) {
            res.json(user);
        });
});

module.exports = router;
