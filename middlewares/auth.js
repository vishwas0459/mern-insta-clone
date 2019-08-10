const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('@hapi/joi');
// get all users

function validateLogin(user) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { error } = validateLogin({ username, password });

  if (error) return res.status(400).send(error.details[0].message);
  // if user input correct
  try {
    // let user = _.pick(req.body,['username','password']);
    let user = await User.findOne({ username });
    if (!user) return res.status(404).send('Invalid username or password!');

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(404).send('Invalid username or password!');
    const token = await jwt.sign(
      _.pick(user, ['username', 'pasword']),
      process.env.JWT_SECRETE
    );
    res
      .header('x-auth-token', token)
      .status(200)
      .send('succssfull login');
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
