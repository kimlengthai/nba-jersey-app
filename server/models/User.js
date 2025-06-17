const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  }
});

// Mongoose automatically pluralises the model name
// 'user' to 'users' as the collection name.
const UserModel = mongoose.model('user', userSchema); // collection name: user
module.exports = UserModel;
