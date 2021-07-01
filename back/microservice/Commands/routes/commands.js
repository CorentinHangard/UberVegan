var express = require("express");
var router = express.Router();
const axios = require("axios");
var Orders = require("../models/orders");
const { JWTContent } = require("../modules/jwt");

router.get("/", async function (req, res, next) {
  await Orders.find({ _id: req.query.id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/bymenus", async function (req, res, next) {
  await Orders.find({ restaurantId: req.query.id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/restaurant/history", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  var rep = null;
  try {
    rep = await axios.get("http://ms-users-service:3008/", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    console.log(rep);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  if (tokenContent.role == 3) {
    await Orders.find({ restaurantId: rep.data.restaurant._id })
      .then((ord) => {
        res.status(200).json(ord);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.get("/history", async function (req, res, next) {
  var rep = null;
  try {
    rep = await axios.get("http://ms-users-service:3008/", {
      headers: {
        Authorization: req.headers.authorization,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  await Orders.find({ profileId: rep.data.profile._id })
    .then((ord) => {
      res.status(200).json(ord);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/create", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  var rep = null;
  try {
    rep = await axios.get("http://ms-users-service:3008/", {
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
    console.log(req.body.restaurantId);

    const order = new Orders({
      restaurantId: req.body.restaurantId,
      profileId: rep.data.profile._id,
      content: articlesList,
      totalPrice: req.body.totalPrice,
      status: "created",
    });

    order
      .save()
      .then(async (ord) => {
        const date = new Date();
        await axios
          .post(
            "http://ms-logs-service:3004/create",
            {
              type: "commande",
              content:
                "l'utilisateur " +
                rep.data.profile._id +
                " (" +
                rep.data.user.usr_email +
                ") à commandé le " +
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
            res.status(201).json({ order: ord });
          })
          .catch((err) => {
            console.log(err);
            res.send(500, err);
          });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/pay", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 1) {
    console.log(req.body.id);
    const order = await Orders.findOne({ _id: req.body.id });

    const orderUpdate = {
      status: "payed",
    };

    await order
      .updateOne(orderUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Commande bien payé");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/valid", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const order = await Orders.findOne({ _id: req.body.id });

    const orderUpdate = {
      status: "validated",
    };

    try {
      await axios.post(
        "http://ms-deliverys-service:3002/create",
        {
          profileId: order.profileId,
          orderId: order._id,
        },
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
    } catch (error) {
      console.log(error);
      res.send(error);
    }

    await order
      .updateOne(orderUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Commande validé");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

module.exports = router;
