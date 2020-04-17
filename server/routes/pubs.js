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

router.post('/pubs', (req, res, next) => {
    console.log('POST request received')
    Pub.create(req)
        .then(function (dbPub) {
            res.json(dbPub);
        });
});

module.exports = router;

