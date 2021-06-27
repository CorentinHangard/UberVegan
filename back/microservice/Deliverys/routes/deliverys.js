var express = require("express");
var router = express.Router();
var Deliverys = require("../models/deliverys");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Deliverys api");
});

module.exports = router;
