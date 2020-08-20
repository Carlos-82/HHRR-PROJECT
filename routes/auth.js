const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

//HELPER FUNCIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

//POST '/SIGNUP'
router.post(
  "/signup",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { Name, Email, Password } = req.body;
    try {
      //if the email exists in the DB
      const emailExists = await User.findOne({ Email }, "Email");
      if (emailExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(Password, salt);
        const newUser = await User.create({ Name, Email, Password: hashPass });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { Email, Password } = req.body;
    try {
      const user = await User.findOne({ Email });
      if (!Email) {
        next(createError(404));
      } else if (bcrypt.compareSync(Password, user.Password)) {
        req.session.currentUser = user;
        req.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
  return;
});

module.exports = router;
