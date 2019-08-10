const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user.model');

// get all users
router.get('/', async (req, res) => {
  //   const { username, password } = req.body;
  try {
    let user = await User.find({}).select({
      username: 1,
      email: 1
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

  try {
    let user = User.findOne({ email: req.body.email });
    if (user.length > 0) return res.status(400).send('user alreay exists');

    user = new User(req.body);
    const result = await user.save();
    user = { email: result.email, username: result.username };
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// find User by username
router.get('/:username', async (req, res) => {
  let username = req.params.username;
  try {
    let user = await User.find({ username }).select({
      username: 1,
      email: 1
    });
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

module.exports = router;
