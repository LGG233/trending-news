const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// define articleSchema
const articleSchema = new Schema({
    title: { type: String, unique: false, required: false },
    link: { type: String, unique: false, required: false }
})


const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
