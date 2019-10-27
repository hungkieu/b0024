const express = require('express');
const User = require('./models/User');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.title = "Hungkq";
  next();
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', async (req, res) => {
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
});

router.get('/signup', async (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
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
});

const getUser = async (req, res, next) => {
  let user = await User.findOne({ _id: req.cookies._id });
  console.log(req.cookies._id);
  if (user) {
    user.password = undefined;
    console.log(user);
    res.locals.user = user;
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/admin', getUser, (req, res) => {
  res.render('admin', { yield: './dashboard/index' });
});

router.get('/admin/posts', getUser, (req, res) => {
  res.render('admin', { yield: './posts/index' });
});

router.get('/signout', (req, res) => {
  res.clearCookie('_id');
  res.redirect('/');
});

module.exports = router;
