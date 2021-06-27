var express = require("express");
var router = express.Router();
var Profiles = require("../models/profiles");
var Restaurants = require("../models/restaurants");
var model = require("../models/users");
const {
  createJWT,
  checkJWT,
  createRefreshToken,
  JWTContent,
} = require("../modules/jwt");

router.get("/", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  const user = await model.user.findOne({
    where: { usr_id: tokenContent.id },
  });
  const profile = await Profiles.findOne({ userId: tokenContent.id });

  res.status(200).json({ ...profile._doc, ...user.dataValues });
});

router.post("/create", async function (req, res, next) {
  if (
    req.body.rolId === undefined ||
    req.body.rolId === 1 ||
    req.body.rolId === 2 ||
    req.body.rolId === 4
  ) {
    const user = await model.user.create({
      usr_email: req.body.email,
      usr_password: req.body.password,
      usr_status: req.body.status,
      rol_id: req.body.rolId ? req.body.rolId : 1,
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
  } else if (
    req.body.rolId &&
    req.body.rolId === 3 &&
    req.body.resName &&
    req.body.resDesc &&
    req.body.resImg &&
    req.body.rescod &&
    req.body.resPrep
  ) {
    const user = await model.user.create({
      usr_email: req.body.email,
      usr_password: req.body.password,
      usr_status: req.body.status,
      rol_id: req.body.rolId ? req.body.rolId : 1,
    });
    const profiles = new Profiles({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      sponsorCode: Math.random().toString(36).substring(7),
      sponsor: req.body.sponsor ? req.body.sponsor : null,
      userId: user.usr_id,
    });
    const restaurants = new Restaurants({
      name: req.body.resName,
      description: req.body.resDesc,
      img: req.body.resImg,
      rating: null,
      costOfDelivery: req.body.rescod,
      preparationTime: req.body.resPrep,
    });

    profiles
      .save()
      .then((profile) => {
        restaurants
          .save()
          .then((restaurant) => {
            res.status(201).json({ ...profile._doc, ...restaurant._doc });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.send("Il manque des infos");
  }
});

router.put("/edit", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  const user = await model.user.findOne({
    where: { usr_id: tokenContent.id },
  });
  const profile = await Profiles.findOne({ userId: tokenContent.id });

  const profileUpdate = {
    fullName: req.body.fullName ? req.body.fullName : profile.fullName,
    phoneNumber: req.body.phoneNumber
      ? req.body.phoneNumber
      : profile.phoneNumber,
    address: req.body.address ? req.body.address : profile.address,
    sponsor: req.body.sponsor ? req.body.sponsor : profile.sponsor,
  };

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

router.delete("/delete", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  const profile = await Profiles.findOne({ userId: tokenContent.id });

  model.user.destroy({
    where: {
      usr_id: tokenContent.id,
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
