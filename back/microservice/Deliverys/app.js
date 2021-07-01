var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
require("dotenv").config();
var database = require("./database");

var deliverysRouter = require("./routes/deliverys");

database.initMongoDB();
database.initMSSQLDB();

var app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./doc/swagger_output.json')

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.disable("etag");
app.use("/", deliverysRouter);

module.exports = app;