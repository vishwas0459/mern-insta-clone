const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('lodash');
// get all users
router.get('/', async (req, res) => {
  //   const { username, password } = req.body;
  try {
    let user = await User.find({}).select({
      username: 1,
      email: 1,
      pictureUrl: 1,
      firstName: 1,
      lastName: 1
    });
    if (user.length === 0) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send('Why???', error);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // user input is correct.
  try {
    // check if user already exist with email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    //if user not exist then save it to database
    user = new User(_.pick(req.body, ['email', 'username', 'password']));

    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    console.log('user saved', user);
    // send the response of
    res.status(200).send(_.pick(user, ['_id', 'username', 'email']));
  } catch (error) {
    console.log('something went wrong in backend', error);
    res.send(400).send(error);
  }
});

// find User by username
// router.get('/:username', async (req, res) => {
//   let username = req.params.username;
//   try {
//     let user = await User.find({ username }).select({
//       username: 1,
//       email: 1
//     });
//     if (user.length === 0) return res.status(404).send('User not found');
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(404).send('Why???', error);
//   }
// });

//findby id
router.get('/:id', async (req, res) => {
  console.log('inside id', req.params.id);
  let id = req.params.id;
  try {
    let user = await User.findById({ _id: id });
    // .select({
    //   username: 1,
    //   email: 1
    // });
    if (user.length === 0) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send('Why???', error);
  }
});

// delete user by username
router.delete('/:username', async (req, res) => {
  let username = req.params.username;
  try {
    let user = await User.findOneAndDelete({ username }).select({
      username: 1,
      email: 1
    });
    if (user) return res.status(200).send(user);
    throw new Error('No such user exists!!!');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// update user by username
router.put('/:username', async (req, res) => {
  let username = req.params.username;
  let updateUsername = req.body.username;
  try {
    let user = await User.findOneAndUpdate(
      username,
      {
        $set: {
          username: updateUsername
        }
      },
      { useFindAndModify: false }
    ).select({ username: 1, email: 1 });
    if (user) return res.status(200).send(user);
    throw new Error('No such user exists!!!');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post('/api/seed', async (req, res) => {
  // const { error } = validate(req.body);
  console.log('resp', req.body);
  // if (error)
  // return res.status(400).send(error.details[0].message);

  // user input is correct.
  // try {
  //   // check if user already exist with email
  //   let user = await User.findOne({ email: req.body.email });
  //   if (user) return res.status(400).send('User already exists');

  //   //if user not exist then save it to database
  //   user = new User(_.pick(req.body, ['email', 'username', 'password']));

  //   //hash the password
  //   const salt = await bcrypt.genSalt(10);
  //   user.password = await bcrypt.hash(user.password, salt);
  //   await user.save();

  //   console.log('user saved', user);
  //   // send the response of
  //   res.status(200).send(_.pick(user, ['_id', 'username', 'email']));
  // } catch (error) {
  //   console.log('something went wrong in backend', error);
  //   res.send(400).send(error);
  // }
});

module.exports = router;
