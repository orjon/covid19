const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const { check, validationResult } = require('express-validator')


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

// @route:  POST api/profile
// @desc:   create or update user profile
// @access: private
router.post('/',
  [
    auth,
    [ 
      check('homeCountry' ,'Home country is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { homeCountries, otherCountries } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id;
    if (otherCountries) {
      //split into arry on comma and remove blank spaces.
      profileFields.otherCountries = otherCountries.split(',').map(country=> country.trim())
    }
    console.log(profileFields.otherCountries)

    res.send('Hello')
})



// @route:  GET api/profile/me
// @desc:   my profile
// @access: private
router.get('/', auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name'])

    if (!profile) {
      return res.status(400).json( { msg : 'There is no profile for this user'})
    }

    res.json(profile)
  } catch (error) {
    res.status(500).send('Server Error')
  }
});

module.exports = router