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
    Pub.findOne({ twitterHandle: req.body.twitterHandle }, (err, pub) => {
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
    var regex = new RegExp(params.params.title, "i");
    Pub.find({ name: regex })
        .then(function (dbTitle) {
            res.json(dbTitle);
        });
})

router.get('/searchPubTwitter/:twitter', (params, res, next) => {
    var regex = new RegExp(["^", params.params.title, "$"].join(""), "i");
    Pub.find({ twitterHandle: regex })
        .then(function (dbTwitter) {
            res.json(dbTwitter);
        });
})



module.exports = router;
