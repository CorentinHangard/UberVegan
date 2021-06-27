var express = require("express");
var router = express.Router();
var Orders = require("../models/orders");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("commands api");
});

module.exports = router;
