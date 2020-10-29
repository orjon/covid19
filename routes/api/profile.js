const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

// @route:  POST api/profile
// @desc:   create or update user profile
// @access: private
router.post('/', auth, async (req, res) => {
  const { countries, graphs } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (countries) {
    //split into arry on comma and remove blank spaces.
    profileFields.countries = countries
      .split(',')
      .map((country) => country.trim());
  }
  if (graphs) {
    //split into arry on comma and remove blank spaces.
    profileFields.graphs = graphs.split(',').map((graph) => graph.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //Create rather than update
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route:  GET api/profile/me
// @desc:   my profile
// @access: private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
