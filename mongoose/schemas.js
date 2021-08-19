const mongoose = require('./config'),

Schema = mongoose.Schema;

const schemas = {
  userSchema: new Schema({
    username: {type: String},
    password: {type: String},
    fullname: {type: String},
    email: {type: String},
    country: {type: String},
  })
};

module.exports = schemas;
