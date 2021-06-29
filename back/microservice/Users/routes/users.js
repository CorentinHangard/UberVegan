var express = require("express");
var router = express.Router();
const axios = require("axios");
var Profiles = require("../models/profiles");
var Restaurants = require("../models/restaurants");
var model = require("../models/users");
const { createJWT, checkJWT, JWTContent } = require("../modules/jwt");

router.get("/", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  var profile = null;
  var user = null;
  var restaurant = null;

  if (req.query.id) {
    profile = await Profiles.findOne({
      _id: req.query.id.replace('"', "").replace('"', ""),
    });

    user = await model.user.findOne({
      where: {
        usr_id: profile.userId,
      },
    });
    var restaurant = null;

    if (tokenContent.role === 3) {
      restaurant = await Restaurants.findOne({ profileId: profile.id });
    }
  } else {
    user = await model.user.findOne({
      where: {
        usr_id: tokenContent.id,
      },
    });

    profile = await Profiles.findOne({ userId: tokenContent.id });
  }

  if (tokenContent.role === 3) {
    restaurant = await Restaurants.findOne({ profileId: profile.id });
  }

  if (tokenContent.role !== 3 && user && profile) {
    res.status(200).json({ profile: profile, user: user.dataValues });
  } else if (tokenContent.role === 3 && user && profile && restaurant) {
    res.status(200).json({
      profile: profile,
      user: user.dataValues,
      restaurant: restaurant,
    });
  } else {
    res.send("L'utilisateur n'existe pas");
  }
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

    var sponsor = null;
    if (req.body.sponsor) {
      const profile = await Profiles.findOne({ sponsorCode: req.body.sponsor });
      console.log(profile.fullName);
      sponsor = profile.fullName;
    }

    const profiles = new Profiles({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      sponsorCode: Math.random().toString(36).substring(7),
      sponsor: sponsor,
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
    req.body.resAdd &&
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
    const profile = new Profiles({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      sponsorCode: Math.random().toString(36).substring(7),
      sponsor: req.body.sponsor ? req.body.sponsor : null,
      userId: user.usr_id,
    });
    const restaurant = new Restaurants({
      profileId: profile._id,
      name: req.body.resName,
      description: req.body.resDesc,
      address: req.body.resAdd,
      img: req.body.resImg,
      rating: null,
      costOfDelivery: req.body.rescod,
      preparationTime: req.body.resPrep,
    });

    profile
      .save()
      .then((prof) => {
        restaurant
          .save()
          .then((rest) => {
            res.status(201).json({ ...prof._doc, ...rest._doc });
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
    where: {
      usr_id: tokenContent.id,
    },
  });
  const profile = await Profiles.findOne({ userId: tokenContent.id });
  var restaurant = null;

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

  await profile.updateOne(profileUpdate);

  if (tokenContent.role === 3) {
    restaurant = await Restaurants.findOne({
      profileId: profile.id,
    });

    const restaurantUpdate = {
      name: req.body.resName ? req.body.resName : restaurant.name,
      description: req.body.resDesc ? req.body.resDesc : restaurant.description,
      address: req.body.resAdd ? req.body.resAdd : restaurant.address,
      img: req.body.resImg ? req.body.resImg : restaurant.img,
      rating: req.body.resRating ? req.body.resRating : restaurant.rating,
      costOfDelivery: req.body.rescod
        ? req.body.rescod
        : restaurant.costOfDelivery,
      preparationTime: req.body.resPrep
        ? req.body.resPrep
        : restaurant.preparationTime,
    };

    await restaurant.updateOne(restaurantUpdate);
  }
  res.status(201).send("Modification enregistré");
});

router.delete("/delete", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  const profile = await Profiles.findOne({ userId: tokenContent.id });
  if (tokenContent.role === 3) {
    const restaurant = await Restaurants.findOne({ profileId: profile.id });
    await restaurant.remove();
  }

  model.user.destroy({
    where: {
      usr_id: tokenContent.id,
    },
  });

  await profile.remove();
  res.status(201).send("Utilisateur bien supprimé");
});

router.post("/authenticate", async (req, res) => {
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
    .then(async (user) => {
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

      try {
        const date = new Date();
        await axios
          .post(
            "http://localhost:3004/create",
            {
              type: "connexion",
              content:
                "l'utilisateur " +
                user.usr_id +
                " (" +
                req.body.email +
                ") c'est connecté le " +
                date.getDate() +
                "/" +
                date.getMonth() +
                "/" +
                date.getFullYear() +
                " à " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds(),
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then(() => {
            res.status(200).json({ isConnected: true, token: token });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } catch (error) {
        res.send(error);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error, isConnected: false });
    });
});

router.get("/restaurant", async function (req, res, next) {
  console.log(req.query.id);
  await Restaurants.find({
    _id: req.body.id || req.query.id,
  })
    .then((rest) => {
      res.status(200).json(rest);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/restaurants", async function (req, res, next) {
  await Restaurants.find()
    .then((rest) => {
      res.status(200).json(rest);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
