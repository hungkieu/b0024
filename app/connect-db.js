module.exports = (MONGODB_URL) => {
  const mongoose = require('mongoose');
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(`Connected to ${MONGODB_URL}`);
  });
};
