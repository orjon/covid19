const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route:  POST api/user/countries
// @desc:   create or update user profile
// @access: private
router.post('/countries', auth, async (req, res) => {
  const { countries } = req.body;
  console.log('countries', countries);

  try {
    user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { countries: countries },
      { new: true }
    );
    res.json(countries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route:  GET api/auth
// @desc:   get User
// @access: Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: 'Sever error' });
  }
});

// @route:  POST api/user
// @desc:   register user
// @access: Public
router.post(
  '/',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    // check('email', 'Please enter a valid email').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { name, email, password } = req.body;
    const { name, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ name: name });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Name is already registered!' }] });
      }

      user = new User({
        name,
        // email,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.msg);
      res.status(500).send('Server error');
    }
  }
);

// @route:  DEL api/user
// @desc:   Delete profile & user
// @access: private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
