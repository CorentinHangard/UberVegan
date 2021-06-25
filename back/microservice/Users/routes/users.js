var express = require("express");
var router = express.Router();
var Profiles = require("../models/profiles");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("User api !");
});

router.post("/create", function (req, res, next) {
  const profiles = new Profiles({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    sponsorCode: req.body.sponsorCode,
    sponsor: req.body.sponsor,
    userId: req.body.userId,
  });
  profiles
    .save()
    .then((profile) => {
      res.status(201).json(profile);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  Profiles.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => console.log(err));
});

router.post("/login", function (req, res, next) {
  console.log(req.body);
});

module.exports = router;
