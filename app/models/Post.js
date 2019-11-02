const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  status: {
    type: String,
  },
  flag: {
    type: String,
  },
}, {
  timestamps: true,
});

const generateFlag = (title) => {
  let flag = title.replace(/\s/g, '-');
  flag = flag.toLowerCase();
  flag += '-' + Date.now();
  return flag;
};

PostSchema.pre('save', function (next) {
  var post = this;
  post.flag = generateFlag(post.title);
  next();
});

module.exports = mongoose.model('posts', PostSchema);
