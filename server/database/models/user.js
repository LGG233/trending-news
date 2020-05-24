const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define userSchema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: false },
  email: { type: String, unique: true, required: false },
  topics: { type: [String], unique: false, required: false },
  publications: [
    {
      name: { type: String, unique: false, required: false },
      twitterHandle: { type: String, unique: false, sparse: true, required: false },
    },
  ],
  savedArticles: [
    {
      id: { type: Number, unique: true, sparse: true, required: true },
      title: { type: String, unique: false, required: false },
      link: { type: String, unique: true, sparse: true, required: true },
      tags: { type: Array, unique: false, required: false },
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
