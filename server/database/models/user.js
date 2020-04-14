const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pub = require('./pub').schema;
const Article = require('./article').schema;
const Topic = require('./topic').schema;

// define userSchema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: false },
  email: { type: String, unique: true, required: false },
  publications: [Pub],
  savedArticles: [Article],
  topics: [Topic],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
