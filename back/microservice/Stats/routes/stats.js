var express = require("express");
var router = express.Router();
const { JWTContent } = require("../modules/jwt");
const axios = require("axios");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("stats api");
});

router.get("/menu", async function (req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const tokenContent = JWTContent(token).user;

  if (tokenContent.role === 3) {
    var reResp = null;
    var menuOrdered = null;
    try {
      reResp = await axios.get("http://localhost:3008/", {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    try {
      menuOrdered = await axios.get(
        "http://localhost:3001/bymenus?id=" + reResp.data.restaurant._id,
        {
          header: {
            Authorization: req.headers.authorization,
          },
        }
      );
    } catch (error) {
      console.log(error);
      res.send(error);
    }
    res.status(200).json({ f: menuOrdered.data.length });
  }
});

module.exports = router;
