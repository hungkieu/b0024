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

module.exports = {
  PostShow,
};
