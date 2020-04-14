const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define userSchema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: false },
  email: { type: String, unique: true, required: false },
  publications: [
    {
      id: { type: Number, unique: true, sparse: true, required: true },
      name: { type: String, unique: false, required: false },
      twitterHandle: { type: String, unique: true, sparse: true, required: true },
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
  topics: [
    {
      id: { type: Number, unique: true, sparse: true, required: true },
      name: { type: String, unique: false, required: false },
      searchTerm: { type: Array, unique: false, required: false },
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
