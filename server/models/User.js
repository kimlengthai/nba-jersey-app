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
  },
  role: {
    type: String,
    enum: ['user', 'staff'],
    default: 'user'
  }
});

// Mongoose automatically pluralises the model name
// 'user' to 'users' as the collection name.
const User = mongoose.model('User', userSchema); // collection name: users
module.exports = User;
