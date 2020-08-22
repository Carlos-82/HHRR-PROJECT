const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../../models/User");
const Contract = require("../../models/Contract");

//informacion del contrato
router.get("/user/:userId/contract", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      const userContract = user.contract;
      Contract.findById(userContract[userContract.length - 1])
        .then((contract) => {
          res.json(contract);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
