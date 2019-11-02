const express = require('express');

const {
  defaultLocals,
  getUser,
} = require('./middlewares/util');

const {
  HomeIndex,
} = require('./middlewares/home');

const {
  AuthSignIn,
  AuthCreateSession,
  AuthSignUp,
  AuthCreateUser,
  AuthSignOut,
} = require('./middlewares/auth');

const {
  PostShow,
  PostNew,
  PostCreate,
} = require('./middlewares/posts');

const router = express.Router();

router.use(defaultLocals);
router.use(getUser);

// Home
router.get('/', HomeIndex);

// Auth
router.get('/signin', AuthSignIn);
router.post('/signin', AuthCreateSession);
router.get('/signup', AuthSignUp);
router.post('/signup', AuthCreateUser);
router.get('/signout', AuthSignOut);

// Posts
router.get('/p/:flag', PostShow);
router.get('/posts/new', PostNew);
router.post('/posts/create', PostCreate);

// admin
router.get('/admin', getUser, (req, res) => {
  res.render('dashboard/index');
});

module.exports = router;
