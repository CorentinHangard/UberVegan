var express = require("express");
var router = express.Router();
var Articles = require("../models/articles");
var Menues = require("../models/menues");
var Categories = require("../models/categories");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("products api");
});

module.exports = router;
