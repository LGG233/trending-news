const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define pubSchema
const pubSchema = new Schema({
  name: { type: String, unique: false, required: false },
  twitterHandle: { type: String, unique: true, sparse: true, required: false },
});

const Pub = mongoose.model('Pub', pubSchema);
module.exports = Pub;
