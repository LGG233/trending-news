const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// define topicsSchema
const topicSchema = new Schema({
    topic: { type: String, unique: true, required: true },
    searchTerms: { type: String, unique: true, required: false },
})

const Topics = mongoose.model('Topics', topicSchema)
module.exports = Topics
