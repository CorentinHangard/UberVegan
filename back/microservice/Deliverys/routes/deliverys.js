var express = require("express");
var router = express.Router();
var Deliverys = require("../models/deliverys");
const { JWTContent } = require("../modules/jwt");

router.get("/", async function (req, res, next) {
  await Deliverys.find({ _id: req.body.id })
    .then((del) => {
      res.status(200).json(del);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/all", async function (req, res, next) {
  await Deliverys.find()
    .then((del) => {
      res.status(200).json(del);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/create", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const delivery = new Deliverys({
      profileId: req.body.profileId,
      orderId: req.body.orderId,
      delivererId: null,
      status: "created",
    });

    delivery
      .save()
      .then((del) => {
        res.status(201).json({ delivery: del });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/accept", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  var rep = null;
  try {
    rep = await axios.get("http://localhost:3008/", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  if (tokenContent.role === 2) {
    const delivery = await Deliverys.findOne({ _id: req.body.id });

    const deliveryUpdate = {
      delivererId: rep.data.profile._id,
      status: "accepted",
    };

    await delivery
      .updateOne(deliveryUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Livraison accepté");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/refuse", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 2) {
    const delivery = await Deliverys.findOne({ _id: req.body.id });

    const deliveryUpdate = {
      delivererId: null,
      status: "refused",
    };

    await delivery
      .updateOne(deliveryUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Livraison refusé");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/take", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 2) {
    const delivery = await Deliverys.findOne({ _id: req.body.id });

    const deliveryUpdate = {
      status: "taked",
    };

    await delivery
      .updateOne(deliveryUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Livraison prise en charge");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/delivered", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 2) {
    const delivery = await Deliverys.findOne({ _id: req.body.id });

    const deliveryUpdate = {
      status: "delivered",
    };

    await delivery
      .updateOne(deliveryUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Livraison livré");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

module.exports = router;
