const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  date: {
    type: [Date],
  },
  confirmed: {
    type: [Number],
  },
  deaths: {
    type: [Number],
  },
  recovered: {
    type: [Number],
  },
  active: {
    type: [Number],
  },
});

const StatsSchema = new mongoose.Schema({
  countrySlug: {
    type: String,
    required: true,
  },
  dataAvailable: {
    type: Boolean,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  data: {
    type: DataSchema,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Stats = mongoose.model('stats', StatsSchema);
