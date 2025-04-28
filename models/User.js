// models/User.js

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  authToken: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
