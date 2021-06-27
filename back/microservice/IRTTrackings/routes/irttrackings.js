var express = require("express");
var router = express.Router();
var Applications = require("../models/applications");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("irttrackings api");
});

module.exports = router;
