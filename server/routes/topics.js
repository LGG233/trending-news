const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.post('/', (req, res, next) => {
    User.findOne({ topics: req.body.entryTerm }, (err, topic) => {
        if (err) {
            console.log('here is the error: ', err);
        } else if (topic) {
            console.log('That search term is already in your topics database');
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

router.post('/:name', (params, res, next) => {
    User.updateOne({ $pull: { topics: params.params.name } })
        .then(function (dbTopics) {
            res.json(dbTopics);
        });
});

module.exports = router;
