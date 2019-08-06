const mongoose = require('mongoose');

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

module.exports = { User };
