var express = require("express");
const axios = require("axios");
var router = express.Router();
var Articles = require("../models/articles");
var Menues = require("../models/menues");
const { JWTContent } = require("../modules/jwt");

router.get("/menu", async function (req, res, next) {
  await Menues.find({ _id: req.query.id })
    .then((menu) => {
      res.status(200).json(menu);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/menus", async function (req, res, next) {
  await Menues.find({ restaurantId: req.query.id })
    .then((menu) => {
      res.status(200).json(menu);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/menu/create", async function (req, res, next) {
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

  if (tokenContent.role === 3 && rep) {
    var articlesList = req.body.articlesListId;

    const menu = new Menues({
      restaurantId: rep.data.restaurant._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img,
      articles: articlesList,
    });

    menu
      .save()
      .then((men) => {
        res.status(201).json({ menu: men });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/menu/edit", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const menu = await Menues.findOne({ _id: req.body.id });

    const menuUpdate = {
      name: req.body.name ? req.body.name : menu.name,
      description: req.body.description
        ? req.body.description
        : menu.description,
      price: req.body.price ? req.body.price : menu.price,
      img: req.body.img ? req.body.img : menu.img,
      categories: req.body.categories ? req.body.categories : menu.categories,
    };

    await menu
      .updateOne(menuUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Un menu bien modifié");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.delete("/menu/delete", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const menu = await Menues.findOne({ _id: req.body.id });

    await menu.remove();
    res.status(201).send("Un menu bien supprimé");
  } else {
    res.status(401).send("Non authorized");
  }
});

router.get("/article", async function (req, res, next) {
  await Articles.find({ _id: req.query.id })
    .then((art) => {
      res.status(200).json(art);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/articles", async function (req, res, next) {
  console.log(req.query.id);
  await Articles.find({ restaurantId: req.query.id })
    .then((art) => {
      console.log(art);
      res.status(200).json(art);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/article/create", async function (req, res, next) {
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

  console.log(req.body.name);

  if (tokenContent.role === 3 && rep) {
    const articles = new Articles({
      restaurantId: rep.data.restaurant._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: req.body.img,
      category: req.body.category,
    });
    articles
      .save()
      .then((art) => {
        res.status(201).json({ art });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send("Non authorized");
  }
});

router.put("/article/edit", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const article = await Articles.findOne({ _id: req.body.id });

    const articleUpdate = {
      name: req.body.name ? req.body.name : article.name,
      description: req.body.description
        ? req.body.description
        : article.description,
      price: req.body.price ? req.body.price : article.price,
      img: req.body.img ? req.body.img : article.img,
      category: req.body.category ? req.body.category : article.category,
    };

    await article
      .updateOne(articleUpdate)
      .exec()
      .then(() => {
        res.status(201).send("Un article bien modifié");
      });
  } else {
    res.status(401).send("Non authorized");
  }
});

router.delete("/article/delete", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    const article = await Articles.findOne({ _id: req.body.id });

    await article.remove();
    res.status(201).send("Un article bien supprimé");
  } else {
    res.status(401).send("Non authorized");
  }
});

module.exports = router;
