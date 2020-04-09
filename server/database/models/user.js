const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// define userSchema
const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  name: { type: String, unique: false, required: false },
  email: { type: String, unique: false, required: false },
  publications: {
    id: { type: Number, unique: true, required: true },
    name: { type: String, unique: false, required: false },
    twitterHandle: { type: String, unique: true, required: true }
  },
  savedArticles: {
    id: { type: Number, unique: true, required: true },
    title: { type: String, unique: false, required: false },
    link: { type: String, unique: true, required: true },
    tags: { type: Array, unique: false, required: false }
  },
  topics: {
    id: { type: Number, unique: true, required: true },
    name: { type: String, unique: false, required: false },
    searchTerm: { type: Array, unique: false, required: false }
  }
})

// define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// define pre-hooks for the save method
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =============NO PASSWORD PROVIDED===============');
    next();
  } else {
  }
  console.log('models/user.js hashPassword in pre save');
  this.password = this.hashPassword(this.password);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
