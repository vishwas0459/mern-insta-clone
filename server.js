const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mern-insta-clone-db')
  .then(db => {
    console.log('Connected to db...');
    // createUser();
  })
  .catch(err => console.log('Something went wrong'));

function createUser() {
  const userSchema = mongoose.Schema({
    email: String,
    password: String
  });

  const User = mongoose.model('User', userSchema);
  const newUser = new User({
    email: 'vishwas',
    password: 'meshram'
  });
  newUser.save();
}
app.get('/', (req, res) => {
  res.send('Hello from express server!!!');
});

app.post('/api/login', (req, res) => {
  console.log('client data', req.body);
});

//TODO: setup login with mLab
const port = 3002;
app.listen(port, () =>
  console.log(`Express server is running on port: ${port}`)
);
