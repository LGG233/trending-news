const express = require('express');
const router = express.Router();
// const { ApiService } = require('../services');
const Pub = require('../database/models/pub');


router.get('/data', (req, res, next) => {
    Pub.find()
        .then(function (dbPubs) {
            res.json(dbPubs);
        })
    // (error) => res.sendStatus(404)
    // );
});

router.post('/', (req, res, next) => {
    console.log('POST request received')
    Pub.findOne({ twitterHandle: req.body.twitterHandle }, (err, pub) => {
        console.log("here is the twitter handle of the publication you'd like to put into the db: ", req.body.twitterHandle)
        if (err) {
            console.log("here is the error: ", err)
        } else if (pub) {
            alert('That publication is already in the database')
            window.location.replace('/pub-display');
        } else {
            Pub.create({
                name: req.body.name,
                twitterHandle: req.body.twitterHandle
            })
                .then(function (dbPub) {
                    res.json(dbPub);
                });
        }
    })
});

module.exports = router;
