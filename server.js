const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users.route');
const auth = require('./middlewares/auth');
require('dotenv').config();
// console.log('env', process.env.JWT_SECRETE);
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
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

//TODO: setup login with mLab
const port = 3002;
app.listen(port, () =>
  console.log(`Express server is running on port: ${port}`)
);
