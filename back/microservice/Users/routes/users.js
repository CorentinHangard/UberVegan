var express = require("express");
var router = express.Router();
var Profiles = require("../models/profiles");
var Restaurants = require("../models/restaurants");
var model = require("../models/users");
const { createJWT, checkJWT, createRefreshToken } = require("../modules/jwt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("User api !");
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  Profiles.findById(id)
    .exec()
    .then(async (doc) => {
      if (doc && doc.userId) {
        const user = await model.user.findOne({
          where: { usr_id: doc.userId },
        });
        res.status(200).json({ ...doc._doc, ...user.dataValues });
      } else {
        res.status(404).send("L'utilisateur n'existe pas");
      }
    })
    .catch((err) => console.log(err));
});

router.post("/create", async function (req, res, next) {
  const user = await model.user.create({
    usr_email: req.body.email,
    usr_password: req.body.password,
    usr_status: req.body.status,
  });
  const profiles = new Profiles({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    sponsorCode: Math.random().toString(36).substring(7),
    sponsor: req.body.sponsor ? req.body.sponsor : null,
    userId: user.usr_id,
  });
  profiles
    .save()
    .then((profile) => {
      res.status(201).json(profile);
    })
    .catch((err) => console.log(err));
});

router.put("/edit/:id", async function (req, res, next) {
  const id = req.params.id;
  const profile = await Profiles.findOne({ _id: id });
  const profileUpdate = {
    fullName: req.body.fullName ? req.body.fullName : profile.fullName,
    phoneNumber: req.body.phoneNumber
      ? req.body.phoneNumber
      : profile.phoneNumber,
    address: req.body.address ? req.body.address : profile.address,
    sponsor: req.body.sponsor ? req.body.sponsor : profile.sponsor,
  };
  const user = await model.user.findOne({ where: { usr_id: profile.userId } });

  model.user.update(
    {
      usr_email: req.body.email ? req.body.email : user.usr_email,
      usr_password: req.body.password ? req.body.password : user.usr_password,
      usr_status: req.body.status ? req.body.status : user.usr_status,
      rol_id: req.body.rolId ? req.body.rolId : user.rol_id,
    },
    { where: { usr_id: profile.userId } }
  );
  await profile
    .updateOne(profileUpdate)
    .exec()
    .then(() => {
      res.status(201).send("Utilisateur bien modifié");
    });
});

router.delete("/delete/:id", async function (req, res, next) {
  const id = req.params.id;
  const profile = await Profiles.findOne({ _id: id });

  model.user.destroy({
    where: {
      usr_id: profile.userId,
    },
  });

  await profile.remove();
  res.status(201).send("Utilisateur bien supprimé");
});

router.post("/authenticate", (req, res) => {
  if (typeof req.params.token !== "undefined") {
    let token = req.params.token;
  }

  model.user
    .findOne({
      where: {
        usr_email: req.body.email,
        usr_password: req.body.password,
      },
      include: [{ model: model.refresh_token }],
    })
    .then((user) => {
      if (!user) {
        return res.status(550).send("Utilisateur inconnu");
      }

      if (typeof req.params.token !== "undefined") {
        let checkJwt = checkJWT(token);
        if (checkJwt == "renew") {
          token = createJWT({
            id: user.usr_id,
            role: user.rol_id,
          });
        }
      } else {
        token = createJWT({
          id: user.usr_id,
          role: user.rol_id,
        });
      }

      res.status(200).json({ isConnected: true, token: token });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ isConnected: false });
    });
});

module.exports = router;
