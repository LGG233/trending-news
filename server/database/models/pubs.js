const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// define pubsSchema
const pubsSchema = new Schema({
    publication: { type: String, unique: true, required: true },
    twitterHandle: { type: String, unique: true, required: true },
})

const Pubs = mongoose.model('Pubs', pubsSchema)
module.exports = Pubs
