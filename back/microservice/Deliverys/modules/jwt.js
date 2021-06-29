var jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

var privateKey = fs.readFileSync(path.join(__dirname, "../config/private.key"));
var public = fs.readFileSync(path.join(__dirname, "../config/public.key"));

const createJWT = (user) => {
  var token = jwt.sign(
    {
      user: user,
    },
    privateKey,
    { expiresIn: "8h" }
  );

  return token;
};

const checkJWT = (token) => {
  var check = false;
  try {
    check = jwt.verify(token, privateKey);
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      check = "renew";
    } else {
      check = false;
    }
  }
  return check;
};

const JWTContent = (token) => {
  var res = null;
  jwt.verify(token, privateKey, function (err, decoded) {
    if (err) {
      res.send(err);
    } else {
      res = decoded;
    }
  });
  return res;
};

const createRefreshToken = () => {
  let refreshToken = crypto.randomBytes(128).toString("base64");
  return refreshToken;
};

module.exports = {
  createJWT: createJWT,
  checkJWT: checkJWT,
  createRefreshToken: createRefreshToken,
  JWTContent,
};
