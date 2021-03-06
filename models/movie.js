const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number, // id фильма, который содержится в ответе сервиса MoviesExplorer
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
