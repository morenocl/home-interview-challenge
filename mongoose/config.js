const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/local');

module.exports = mongoose;
