const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../../models/User");

//informacion del contrato
router.patch("/:userId/editProfile", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
