const User = require('models/User');

const AuthSignIn = (req, res) => {
  res.render('auth/signin');
}

const AuthCreateSession = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (
        user &&
        User.authenticate(password, user.password)
      ) {
        res.cookie('_id', user.id);
      }
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
}

const AuthSignUp = (req, res) => {
  res.render('auth/signup');
};

const AuthCreateUser = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    // eslint-disable-next-line no-unused-vars
    passwordConfirmation,
  } = req.body;

  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then(() => {
      console.log(123123);
      res.send('/signin');
    })
    .catch(error => {
      next(error);
    });
};

const AuthSignOut = (req, res) => {
  res.clearCookie('_id');
  res.redirect('/');
};

module.exports = {
  AuthSignIn,
  AuthCreateSession,
  AuthSignUp,
  AuthCreateUser,
  AuthSignOut,
};
