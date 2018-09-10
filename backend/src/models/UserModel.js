const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserModel = mongoose.Schema({
    fullname: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
  },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
});

// before being saved, a instance of the UserModel will automatically have it's password hashed via bcrypt
UserModel.pre('save', function(next) {
    return bcrypt
      .hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        return next();
      })
      .catch(err => {
        return next(err);
      });
});

UserModel.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};
  
module.exports = mongoose.model('users', UserModel);