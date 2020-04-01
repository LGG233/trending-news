const express = require('express')
const router = express.Router()
const Pub = require('../database/models/pubs')

router.post("/newPub", function (req, res) {
    const { publication, twitterHandle } = req.body
    User.findOne({ publication: publication }, (err, user) => {

        const newPub = new Pub({
            publication: publication,
            twitterHandle: twitterHandle
        })
        newPub.save((err, savedPub) => {
            if (err) return res.json(err)
            res.json(savedPub)
        })
    })
})