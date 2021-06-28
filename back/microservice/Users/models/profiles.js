var mongoose = require("mongoose");

const profilesSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: Number,
  address: String,
  sponsorCode: String,
  sponsor: String,
  userId: String,
});

module.exports = mongoose.model("Profiles", profilesSchema);
