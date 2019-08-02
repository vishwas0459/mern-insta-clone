const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mern-insta-clone-db', {
    useNewUrlParser: true
  })
  .then(db => {
    console.log('Connected to db...');
    // createUser();
  })
  .catch(err => console.log('Something went wrong'));

const userSchema = mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);
function createUser() {
  const newUser = new User({
    email: 'vishwas',
    password: 'meshram'
  });
  newUser.save();
}
app.get('/api/', async (req, res) => {
  const user = await User.find({});
  console.log('User', user);
  res.send('Hello from express server!!!');
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  console.log('client data', user);
  const result = await User.find(user);
  console.log('result', result);
  if (result.length > 0) {
    res.send(result);
  } else {
    res.status(404).send('no user exist');
  }
});

//TODO: setup login with mLab
const port = 3002;
app.listen(port, () =>
  console.log(`Express server is running on port: ${port}`)
);
