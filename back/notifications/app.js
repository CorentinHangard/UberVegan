const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// ajout de socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/send", function (req, res) {
  var io = require("socket.io-client");
  var socket = io.connect("http://localhost:3005");
  socket.emit("SEND_MESSAGE", {
    message: req.body.message,
  });
});

app.get("/json", function (req, res) {
  res.status(200).json({ message: "ok" });
});

// établissement de la connexion
io.on("connection", (socket) => {
  console.log(`Connecté au client ${socket.id}`);
  socket.on("SEND_MESSAGE", function (data) {
    console.log(data);
    io.emit("MESSAGE", data);
  });
});

// on change app par server
server.listen(3005, function () {
  console.log("Votre app est disponible sur localhost:3000 !");
});

module.exports = app;
