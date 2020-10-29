const express = require('express');
const axios = require('axios');
const router = express.Router();

//Get list of countries
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.covid19api.com/countries');
    res.send(response.data);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send('Server error');
  }
});

module.exports = router;
