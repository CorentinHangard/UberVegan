const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("./registry.json");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

var privateKey = fs.readFileSync(path.join(__dirname, "../config/private.key"));

router.all("/api/:apiName/*", (req, res) => {
  if (registry.services[req.params.apiName]) {
    var authNeeded = true;
    registry.services[req.params.apiName].nonAuth.forEach((route) => {
      if (req.params[0] === route) {
        authNeeded = false;
      }
    });
    if (!authNeeded) {
      console.log(registry.services[req.params.apiName].url + req.params[0]);
      axios({
        method: req.method,
        url: registry.services[req.params.apiName].url + req.params[0],
        headers: req.headers,
        data: req.body,
      })
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1];
        jwt.verify(token, privateKey, function (err, decoded) {
          if (err) {
            res.send(err);
          } else {
            console.log(
              registry.services[req.params.apiName].url + req.params[0]
            );
            axios({
              method: req.method,
              url: registry.services[req.params.apiName].url + req.params[0],
              headers: req.headers,
              data: req.body,
            })
              .then((response) => {
                res.send(response.data);
              })
              .catch((error) => {
                res.send(error);
              });
          }
        });
      } else {
        res.send("Token needed");
      }
    }
  } else {
    res.send("API name doesn't exist");
  }
});

module.exports = router;
