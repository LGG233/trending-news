const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.post('/', (req, res, next) => {
    User.findOne({ topics: req.body.entryTerm }, (err, topic) => {
        if (err) {
            res.sendStatus(500);
        } else if (topic) {
            res.sendStatus(409)
        } else {
            User.updateOne(
                {
                    $push: { topics: req.body.entryTerm },
                }).then(function (dbTopics) {
                    res.json(dbTopics);
                });
        }
    });
});

router.delete('/:name', (params, res, next) => {
    User.updateOne({ $pull: { topics: params.params.name } })
        .then(function (dbTopics) {
            res.json(dbTopics);
        });
});

module.exports = router;
