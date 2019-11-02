const Post = require('models/Post');

const PostShow = (req, res, next) => {
  const { flag } = req.params;
  Post.findOne({ flag })
    .then(post => {
      res.render('posts/show', { post });
    })
    .catch(error => {
      next(error);
    });
};

const PostNew = (req, res) => {
  res.render('posts/new');
};

const PostCreate = (req, res, next) => {
  console.log(req.body);

  const { 
    title,
    status,
    content,
  } = req.body;

  const author = res.locals.user._id;
  console.log(author);
  
  Post.create({
    title,
    status,
    content,
    author,
  })
    .then(post => {
      res.send({ flag: `/p/${post.flag}` });
    })
    .catch(error => {
      next(error);
    })
};

module.exports = {
  PostShow,
  PostNew,
  PostCreate,
};
