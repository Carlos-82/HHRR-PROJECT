const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Company = require("../models/Company");
const Contract = require("../models/Contract");

//informacion del contrato
router.get("/user/:id/contract", (req, res, next) => {
  User.findById(user._id)
    .then((user) => {
      Contract.findById({ _id: user.contract._id })
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
