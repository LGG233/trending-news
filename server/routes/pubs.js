const express = require('express');
const router = express.Router();
// const { ApiService } = require('../services');
const Pub = require('../database/models/pub');

router.get('/pubs/data', (res, next) => {
    Pub.find().then(
        (pubsList) => res.json(pubsList),
        (error) => res.sendStatus(404)
    );
    console.log("here is the json from the db", res);
});

router.post('/pubs', (req, res, next) => {
    console.log('POST request received')
    Pub.create(req)
        .then(function (dbPub) {
            res.json(dbPub);
        });
});

module.exports = router;

