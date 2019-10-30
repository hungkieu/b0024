const User = require('models/User');

const defaultLocals = (req, res, next) => {
  res.locals.title = "Hungkq";
  next();
};

const getUser = async (req, res, next) => {
  if (!req.cookies._id) next();

  let user = await User.findOne({
    _id: req.cookies._id
  }).catch(error => {
    throw error;
  });

  if (user) {
    user.password = undefined;
    res.locals.user = user;
  } 

  next();
};

module.exports = {
  defaultLocals,
  getUser,
};
