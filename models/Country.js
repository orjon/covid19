const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  country: {
    type: String,
  },
  slug: {
    type: String,
  },
  iso2: {
    type: String,
  },
  flag: {
    type: String,
  },
  population: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Country = mongoose.model('countries', CountrySchema);
