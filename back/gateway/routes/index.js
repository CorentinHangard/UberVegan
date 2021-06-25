const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("./registry.json");

router.all("/:apiName/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  if (registry.services[req.params.apiName]) {
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
    res.send("API name doesn't exist");
  }
});

module.exports = router;
