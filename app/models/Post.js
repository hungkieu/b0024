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
}, {
  timestamps: true,
});

module.exports = mongoose.model('posts', PostSchema);
