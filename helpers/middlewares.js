const createError = require("http-errors");
const User = require("../models/User");

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isAdmin = () => (req, res, next) => {
  if (req.session.currentUser.admin) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next(createError(400));
  else next();
};

exports.hasCompany = () => (req, res, next) => {
  const currentUser = req.session.currentUser;
  User.findById(currentUser._id)
    .then((user) => {
      if (user.companyId) {
        next(
          createError(409, {
            message: "You already has company",
          })
        );
      }
      next();
    })
    .catch((err) => next(createError(500, err)));
};
