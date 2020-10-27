const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route:  POST api/auth
// @desc:   authenticate user and get token
// @access: Public
router.post('/',[
  check('email','Please enter a valid email')
    .isEmail(),
  check('password', 'Password is required')
    .exists()
  ],
  async (req,res) => { 
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  const { email, password } = req.body

  try {
    // See if user exists
    let user = await User.findOne({ email: email})

    if (!user ) {
      return res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]})
    }

    // Check user's password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]})
    }

    //Return JWT
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token })
      }
    )
  } catch (error) {
    console.error(error.msg)
    res.status(500).send('Server error')
  }

});




// @route:  GET api/auth
// @desc:   test route
// @access: Public
router.get('/', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ msg: 'Sever error'})
  }
});




module.exports = router