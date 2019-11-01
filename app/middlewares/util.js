const User = require('models/User');

const VARIABLES = {
  title: "Hungkq",
  user: undefined,
};

const defaultLocals = (req, res, next) => {
  res.locals = { ...VARIABLES, ...res.locals };
  next();
};

const getUser = (req, res, next) => {
  if (!req.cookies._id) next();

  User.findOne({
    _id: req.cookies._id
  }).then(user => {
      if (user) {
        user.password = undefined;
        res.locals.user = user;
      }
      next();
    })
    .catch(error => {
      next(error);
    });
};

module.exports = {
  defaultLocals,
  getUser,
};
