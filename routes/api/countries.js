const express = require('express');
const axios = require('axios');
const router = express.Router();
const dayjs = require('dayjs');
const Country = require('../../models/Country');

const saveCountry = async (country) => {
  let thisCountry = new Country({
    country: country.Country,
    slug: country.Slug,
    iso2: country.ISO2,
  });
  await thisCountry.save();
};

const addCountryFlagAndPopulation = async (country) => {
  await Country.findOneAndUpdate(
    { iso2: country.alpha2Code },
    { $set: { flag: country.flag, population: country.population } },
    { new: true }
  );
};

//GET api/countries
//Get list of countries
router.get('/', async (req, res) => {
  try {
    //Check age of country list
    // let savedCountries = false;
    // let now = dayjs();
    // let age = false;
    // let updatedToday = false;
    // savedCountries = await Country.find();

    // //Check if country list is from today or more than 24hrs old
    // if (savedCountries) {
    //   age = now.diff(savedCountries[0].date, 'hours', true);
    //   updatedToday = now.isSame(savedCountries[0].date, 'day');
    //   console.log(
    //     'Country list age: ' +
    //       age.toFixed(1) +
    //       'hrs. Updated today: ' +
    //       updatedToday
    //   );
    // }

    // if (!updatedToday || age >= 24) {
    //   console.log('Updating country list...');
    //   let availableCountries = await axios.get(
    //     'https://api.covid19api.com/countries'
    //   );

    //   let countries = availableCountries.data.sort(function (a, b) {
    //     return a.Country.localeCompare(b.Country);
    //   });

    //   //Delete all existing entries
    //   await Country.deleteMany({});

    //   // Promise.all(countries.map((country) => updateCountry(country)));
    //   Promise.all(countries.map((country) => saveCountry(country)));

    //   let response2 = await axios.get(
    //     'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag;population'
    //   );

    //   let countryFlags = response2.data;

    //   Promise.all(
    //     countryFlags.map((country) => {
    //       addCountryFlagAndPopulation(country);
    //     })
    //   );
    // } else {
    //   console.log('Using existing country list.');
    // }

    let stuffToSend = await Country.find();

    res.send(stuffToSend);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server error');
  }
});

module.exports = router;
