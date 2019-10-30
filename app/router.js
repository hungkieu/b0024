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
} = require('./middlewares/auth');

const Post = require('./models/Post');
const router = express.Router();

router.use(defaultLocals);
router.use(getUser);

router.get('/', HomeIndex);
router.get('/signin', AuthSignIn);
router.post('/signin', AuthCreateSession);
router.get('/signup', AuthSignUp);
router.post('/signup', AuthCreateUser);

router.get('/admin', getUser, (req, res) => {
  res.render('admin', {
    yield: './dashboard/index'
  });
});

router.get('/admin/posts', getUser, (req, res) => {
  res.render('admin', {
    yield: './posts/index'
  });
});

router.get('/admin/posts/new', getUser, (req, res) => {
  res.render('admin', {
    yield: './posts/new'
  });
});

router.post('/admin/posts/new', getUser, async (req, res) => {
  const {
    title,
    content
  } = req.body
  const author = res.locals.user.id

  try {
    await Post.create({
      title,
      content,
      author
    })
  } catch (error) {
    res.status(500).send({
      "msg": "error"
    })
  }

  res.status(200).send(req.body);
});

router.get('/admin/posts/my-post', getUser, async (req, res) => {
  const author = res.locals.user.id
  const posts = await Post.find({
    "author": author
  })

  res.status(200).send({
    "results": JSON.parse(JSON.stringify(posts))
  })
})

router.get('/admin/posts/:id/view', getUser, async (req, res) => {
  const id = req.params.id
  const author = res.locals.user.id

  try {
    const post = await Post.findOne({
      "_id": id,
      "author": author
    })

    res.status(200).send({
      "results": JSON.parse(JSON.stringify(post))
    })
  } catch (error) {
    res.status(500).send({
      "msg": "error"
    })
  }
})

router.get('/admin/posts/:id/delete', getUser, async (req, res) => {
  const author = res.locals.user.id
  const id = req.params.id

  try {
    await Post.remove({
      "_id": id,
      "author": author
    })

    res.status(200).send({
      'msg': "delete success"
    })
  } catch (error) {
    res.status(500).send({
      "msg": "server error"
    })
  }
})

router.post('/admin/posts/:id/edit', getUser, async (req, res) => {
  const id = req.params.id
  const author = res.locals.user.id
  const {
    title,
    content
  } = req.body

  const query = {
    "_id": id,
    "author": author
  }
  const change = {
    "$set": {
      "title": title,
      "content": content
    }
  }
  try {
    await Post.updateOne(query, change)
    console.log("success")
  } catch (error) {
    res.status(500).send({
      "msg": "update failed"
    })
  }

  res.status(200).send({
    "msg": "edit success"
  })
})

router.get('/admin/posts/:id/edit', getUser, (req, res) => {
  res.render('admin', {
    yield: './posts/edit'
  });
});

router.get('/signout', (req, res) => {
  res.clearCookie('_id');
  res.redirect('/');
});

module.exports = router;
