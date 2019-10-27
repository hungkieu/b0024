const express = require('express');
const User = require('./models/User');
const Post = require('./models/Post')
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

router.get('/admin/posts/new', getUser, (req, res) => {
  res.render('admin', { yield: './posts/new' });
});

router.post('/admin/posts/new', getUser, async (req, res) => {
  const { title, content } = req.body
  const author = res.locals.user.id

  try {
    await Post.create({
      title,
      content,
      author
    })
  } catch (error) {
    res.status(500).send({"msg": "error"})
  }

  res.status(200).send(req.body);
});

router.get('/admin/posts/my-post', getUser, async (req, res) => {
  const author = res.locals.user.id
  const posts = await Post.find({"author": author})
  
  res.status(200).send({"results": JSON.parse(JSON.stringify(posts))})
})

router.get('/admin/posts/:id/view', getUser, async (req, res) => {
  const id = req.params.id
  const author = res.locals.user.id

  try {
    const post = await Post.findOne({"_id": id, "author": author})
    
    res.status(200).send({"results": JSON.parse(JSON.stringify(post))})
  } catch(error) {
    res.status(500).send({"msg": "error"})
  }
})

router.get('/admin/posts/:id/delete', getUser, async (req, res) => {
  const author = res.locals.user.id
  const id = req.params.id

  try {
    await Post.remove({"_id": id, "author": author})

    res.status(200).send({'msg': "delete success"})
  } catch(error) {
    res.status(500).send({"msg": "server error"})
  }
})

router.post('/admin/posts/:id/edit', getUser, async (req, res) => {
  const id = req.params.id
  const author = res.locals.user.id
  const { title, content } = req.body

  const query = {"_id": id, "author": author}
  const change = {
    "$set": {
      "title": title,
      "content": content
    }
  }
  try {
    await Post.updateOne(query, change)
    console.log("success")
  } catch(error) {
    res.status(500).send({"msg": "update failed"})
  }

  res.status(200).send({"msg": "edit success"})
})

router.get('/admin/posts/:id/edit', getUser, (req, res) => {
  res.render('admin', { yield: './posts/edit' });
});

router.get('/signout', (req, res) => {
  res.clearCookie('_id');
  res.redirect('/');
});

module.exports = router;
