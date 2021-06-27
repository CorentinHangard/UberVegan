var mongoose = require('mongoose');

const applicationsSchema = new mongoose.Schema({
  name: String,
  description: String,
  token: String,
  fqdn: String,
});

module.exports = mongoose.model("Applications", applicationsSchema);