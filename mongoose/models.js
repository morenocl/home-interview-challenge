const mongoose = require('./config');
const userSchema = require('./schemas').userSchema;

const models = {
  User: mongoose.model('user', userSchema)
};

module.exports = models;
