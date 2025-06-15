const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const UserModel = mongoose.model('register', userSchema); // collection name: register
module.exports = UserModel;
