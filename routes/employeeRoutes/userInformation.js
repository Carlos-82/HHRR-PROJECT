const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../../models/User");

//informacion del trabajador
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
