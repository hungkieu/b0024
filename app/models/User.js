const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: Number,
    enum: [1,2],
    default: 1,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

UserSchema.statics.authenticate = (
  password,
  hash,
) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('users', UserSchema);
