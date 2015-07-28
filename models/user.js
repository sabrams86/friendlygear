var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  dateJoined: {type: Date, required: true},
  interests: {type: String}
})

var User = mongoose.model('User', userSchema);

module.exports = User;
