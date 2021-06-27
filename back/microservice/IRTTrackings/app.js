var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
require("dotenv").config();
var database = require("./database");

var irttrackingsRouter = require("./routes/irttrackings");

database.initMongoDB();
database.initMSSQLDB();

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", irttrackingsRouter);

module.exports = app;
