const express = require("express");
const app = express();
const helmet = require("helmet");
const routes = require("./routes");
const PORT = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use("/", routes);
app.listen(PORT, () => {
  console.log("Gateway has started on port " + PORT);
});
