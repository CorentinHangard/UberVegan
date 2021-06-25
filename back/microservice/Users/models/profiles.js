var mongoose = require("mongoose");

const profilesSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: Number,
  address: String,
  sponsorCode: String,
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: "Profiles" },
  userId: String,
});

module.exports = mongoose.model("Profiles", profilesSchema);
