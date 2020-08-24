const express = require("express");
const router = express.Router();
const contractInformation = require("./contractInformation");
const userInformation = require("./userInformation");
const editProfile = require("./editInformation");
const app = require("../../appexpress");

app.use("/", contractInformation);
app.use("/", userInformation);
app.use("/", editProfile);

module.exports = router;
