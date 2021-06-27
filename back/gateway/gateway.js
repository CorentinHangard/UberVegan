const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const helmet = require("helmet");
const routes = require("./routes");
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use("/", routes);
app.listen(PORT, () => {
  console.log("Gateway has started on port " + PORT);
});
