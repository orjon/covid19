const mongoose = require('mongoose');

const CountriesSchema = new mongoose.Schema({
  Country: {
    type: String,
  },
  Slug: {
    type: String,
  },
  ISO2: {
    type: String,
  },
});

module.exports = Countires = mongoose.model('countries', CountriesSchema);
