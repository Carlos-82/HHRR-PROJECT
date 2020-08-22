const express = require("express");
const router = express.Router();
const contractInformation = require("./contractInformation");
const userInformation = require("./userInformation");
const app = require("../../appexpress");

app.use("/", contractInformation);
app.use("/", userInformation);

module.exports = router;
