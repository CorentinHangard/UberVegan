var mongoose = require("mongoose");

const restaurantsSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profiles" },
  name: String,
  description: String,
  img: String,
  rating: Number,
  costOfDelivery: String,
  preparationTime: Number,
});

module.exports = mongoose.model("Restaurants", restaurantsSchema);
