var express = require("express");
var router = express.Router();
const axios = require("axios");
var Orders = require("../models/orders");
const { JWTContent } = require("../modules/jwt");

router.get("/order", async function (req, res, next) {
  await Orders.find({ _id: req.body.id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/order/restaurant/history", async function (req, res, next) {
  await Orders.find({ restaurantId: req.body.id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/order/history", async function (req, res, next) {
  await Orders.find({ profileId: req.body.id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/order/create", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  var rep = null;
  console.log(tokenContent);
  try {
    rep = await axios.get("http://localhost:3008/", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    console.log(rep);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  if (tokenContent.role === 1 && rep) {
    var articlesList = req.body.articlesListId;

    const order = new Orders({
      restaurantId: req.body.restaurantId,
      profileId: rep.data.profile._id,
      content: articlesList,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
    });

    order
      .save()
      .then((ord) => {
        res.status(201).json({ order: ord });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/order/pay", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 1) {
    const order = await Orders.findOne({ _id: req.body.id });

    const orderUpdate = {
      status: "payed",
    };

    await order
      .updateOne(orderUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Commade bien payé");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/order/valid", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const order = await Orders.findOne({ _id: req.body.id });

    const orderUpdate = {
      status: "validated",
    };

    await order
      .updateOne(orderUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Commade bien payé");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

module.exports = router;
