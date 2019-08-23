const axios = require('axios');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const users = require('./routes/users.route');
// const auth = require('./middlewares/auth');
// require('dotenv').config();
// console.log('env', process.env.JWT_SECRETE);
app.use(express.json());
// app.use('/api/auth', auth);
// app.use('/api/users', users);
mongoose
  .connect('mongodb://localhost:27017/mern-insta-clone-db', {
    useNewUrlParser: true
  })
  .then(db => {
    console.log('Connected to db...');
  })
  .catch(err => console.log('Something went wrong'));
app.get('/', (req, res) => {
  res.status(200).send('Hello from backend!!!');
});

//captilise the name
const capitalMe = name => {
  return (
    name.slice(0, 1).toUpperCase() + name.slice(1, name.length).toLowerCase()
  );
};

const getUserDate = async () => {
  const { data } = await axios.get(
    'https://randomuser.me/api/?nat=au&results=10'
  );
  return data.results;
};
// seed data logic
app.post('/seedDB', async (req, res) => {
  console.log('transform data.....');
  const data = await getUserDate();
  console.log('data', data);

  const userInfo = data.map(user => {
    return {
      firstName: capitalMe(user.name.first),
      lastName: capitalMe(user.name.last),
      username: user.login.username,
      password: user.login.password,
      city: capitalMe(user.location.city),
      postcode: user.location.postcode,
      email: user.email,
      dob: user.dob.date.slice(0, 10),
      pictureUrl: user.picture.large,
      gender: user.gender,
      phoneNumber: user.phone
    };
  });
  // res.send(JSON.stringify(userInfo));
  // create a model
  const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    city: String,
    postcode: Number,
    email: String,
    dob: String,
    pictureUrl: String,
    gender: String,
    phoneNumber: String
  });
  userInfo.map(async user => {
    const newUser = _.pick(user, [
      'username',
      'password',
      'phoneNumber',
      'gender',
      'email',
      'dob',
      'pictureUrl',
      'city',
      'firstName',
      'lastName',
      'postcode'
    ]);

    try {
      //hash the password
      console.log('newUser', newUser);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      let x = new User(newUser);
      await x.save();
    } catch (error) {
      console.log(error);
    }
  });

  // newUser
  //   .save()
  //   .then(d => console.log(d))
  //   .catch(e => console.log(e));
});

const port = 3002;
app.listen(port, () =>
  console.log(`Express server is running on port: ${port}`)
);
