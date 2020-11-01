const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  Country: {
    type: String,
  },
  Slug: {
    type: String,
  },
  ISO2: {
    type: String,
  },
  Flag: {
    type: String,
  },
});

module.exports = Country = mongoose.model('countries', CountrySchema);
