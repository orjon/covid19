const express = require('express');
const axios = require('axios');
const router = express.Router();
const dayjs = require('dayjs');
const Country = require('../../models/Country');
const Stats = require('../../models/Stats');

// GET api/data/
// get data for country
router.get('/:countrySlug', async (req, res) => {
  let country = req.params.countrySlug;

  try {
    let existingEntry = false;
    let now = dayjs(); //current date & time
    let age = false;
    let updatedToday = false;

    existingEntry = await Stats.findOne({ countrySlug: country });

    if (existingEntry) {
      age = now.diff(existingEntry.date, 'hours', true);
      updatedToday = now.isSame(existingEntry.date, 'day');
      console.log(
        country +
          ' data age: ' +
          age.toFixed(1) +
          'hrs. Updated today: ' +
          updatedToday
      );
    } else {
      console.log('No entry found for: ' + country);
    }

    if (!updatedToday || age >= 24) {
      const response = await axios.get(
        `https://api.covid19api.com/total/country/${country}`
      );

      let statsObject = {};

      if (response.data.length === 0) {
        statsObject = {
          countrySlug: country,
          dataAvailable: false,
        };
      } else {
        statsObject = {
          countrySlug: country,
          dataAvailable: true,
          data: {
            date: response.data.map((entry) => entry.Date),
            confirmed: response.data.map((entry) => entry.Confirmed),
            deaths: response.data.map((entry) => entry.Deaths),
            recovered: response.data.map((entry) => entry.Recovered),
            active: response.data.map((entry) => entry.Active),
          },
          from: response.data[0].Date,
          to: response.data[response.data.length - 1].Date,
        };
      }

      if (existingEntry) {
        await Stats.findOneAndDelete({ countrySlug: country });
        console.log(`Deleted ${country} data.`);
      }

      let newEntry = new Stats(statsObject);
      await newEntry.save();
      console.log(`Added ${country} data.`);
      res.json(newEntry);
    } else {
      console.log(`Using existing ${country} data.`);
      res.json(existingEntry);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
