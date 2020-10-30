const express = require('express');
const axios = require('axios');
const router = express.Router();
const Country = require('../../models/Country');

// const saveCountry = async (country) => {
//   let thisCountry = new Country(country);
//   await thisCountry.save();
// };

const updateCountry = async (country) => {
  await Country.findOneAndUpdate(
    { Country: country.Country },
    { $set: country },
    { new: true, upsert: true }
  );
};

//Get list of countries
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.covid19api.com/countries');
    console.log(`Got ${response.data.length} countries from server`);
    let countries = response.data;

    Promise.all(countries.map((country) => updateCountry(country)));

    res.send(countries);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server error');
  }
});

module.exports = router;
