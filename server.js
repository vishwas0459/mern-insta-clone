const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('./routes/users.route');
app.use(express.json());
app.use('/api/users', users);
mongoose
  .connect('mongodb://localhost:27017/mern-insta-clone-db', {
    useNewUrlParser: true
  })
  .then(db => {
    console.log('Connected to db...');
  })
  .catch(err => console.log('Something went wrong'));

// app.get('/api/', async (req, res) => {
//   const user = await User.find({});
//   console.log('User', user);
//   res.send('Hello from express server!!!');
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = { email: 'vishwas', password };
//   console.log('client data', user);
//   try {
//     const result = await User.find(user);
//     if (result.length > 0) {
//       console.log('user is found', result);
//     }
//     res.send(result);
//   } catch (error) {
//     console.log('Something went wrong!!!', error);
//     res.send(error);
//   }
// });

//TODO: setup login with mLab
const port = 3002;
app.listen(port, () =>
  console.log(`Express server is running on port: ${port}`)
);
