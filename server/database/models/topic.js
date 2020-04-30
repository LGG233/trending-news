const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define topicSchema
const topicSchema = new Schema({
  name: { type: String, unique: false, required: false },
  searchTerm: { type: String, unique: false, required: false },
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
