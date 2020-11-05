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

const addCountryFlag = async (country) => {
  await Country.findOneAndUpdate(
    { ISO2: country.alpha2Code },
    { $set: { Flag: country.flag } },
    { new: true }
  );
};

//Get list of countries
router.get('/', async (req, res) => {
  try {
    let availableCountries = await axios.get(
      'https://api.covid19api.com/countries'
    );
    console.log(
      `Got ${availableCountries.data.length} countries from Covid19 server`
    );
    let countries = availableCountries.data.sort(function (a, b) {
      return a.Country.localeCompare(b.Country);
    });

    Promise.all(countries.map((country) => updateCountry(country)));

    let response2 = await axios.get(
      'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag'
    );
    console.log(
      `Got ${response2.data.length} countries from RESTcountries server`
    );
    let countryFlags = response2.data;

    Promise.all(
      countryFlags.map((country) => {
        addCountryFlag(country);
      })
    );

    let stuffToSend = await Country.find();

    res.send(stuffToSend);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server error');
  }
});

module.exports = router;
