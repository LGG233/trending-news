const express = require('express');
const router = express.Router();
// const { ApiService } = require('../services');
const Pub = require('../database/models/pub');


router.get('/data', (req, res, next) => {
    Pub.find().sort({ 'name': 1 })
        .then(function (dbPubs) {
            res.json(dbPubs);
        })
    // (error) => res.sendStatus(404)
    // );
});

router.post('/', (req, res, next) => {
    // console.log('POST request received')
    Pub.findOne({ twitterHandle: req.body.twitterHandle }, (err, pub) => {
        // console.log("here is the twitter handle of the publication you'd like to put into the db: ", req.body.twitterHandle)
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

router.get('/searchPubTitle/:title', (params, res, next) => {
    Pub.find({ name: params.params.title })
        .then(function (dbTitle) {
            res.json(dbTitle);
        });
})

router.get('/searchPubTwitter/:twitter', (params, res, next) => {
    Pub.find({ twitterHandle: params.params.twitter })
        .then(function (dbTwitter) {
            res.json(dbTwitter);
        });
})



module.exports = router;
