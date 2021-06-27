var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
require("dotenv").config();
var database = require("./database");

var usersRouter = require("./routes/users");

database.initMongoDB();
database.initMSSQLDB();

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);

module.exports = app;
