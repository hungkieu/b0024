const User = require('models/User');

const AuthSignIn = (req, res) => {
  res.render('auth/signin');
}

const AuthCreateSession = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (
    user &&
    await User.authenticate(password, user.password)
  ) {
    res.cookie('_id', user.id);
    res.redirect('/admin');
  }
  res.redirect('/');
}

const AuthSignUp = (req, res) => {
  res.render('auth/signup');
};

const AuthCreateUser = async (req, res) => {
  const {
    fisrtName,
    lastName,
    email,
    password,
    // eslint-disable-next-line no-unused-vars
    passwordConfirmation,
  } = req.body;

  try {
    await User.create({
      fisrtName,
      lastName,
      email,
      password,
    });
    res.redirect('/signin');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  AuthSignIn,
  AuthCreateSession,
  AuthSignUp,
  AuthCreateUser
};
