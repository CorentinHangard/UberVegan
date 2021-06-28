const express = require('express')
const app = express()
const helmet = require('helmet')
const routes = require('./routes')
const PORT = 8000
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use("/", routes);
app.listen(PORT, () => {
  console.log("Gateway has started on port " + PORT);
});
