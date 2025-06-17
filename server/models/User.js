const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Mongoose automatically pluralises the model name
// 'register' to 'registers' as the collection name.
const UserModel = mongoose.model('register', userSchema); // collection name: register
module.exports = UserModel;
