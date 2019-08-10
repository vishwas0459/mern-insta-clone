const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
// create a schema for Users model

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
