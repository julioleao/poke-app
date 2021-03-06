const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost/pokeapp';

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

console.log(url);
