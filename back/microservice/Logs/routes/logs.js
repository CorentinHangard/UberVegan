var express = require("express");
var router = express.Router();
var Logs = require("../models/logs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("logs api");
});

module.exports = router;
