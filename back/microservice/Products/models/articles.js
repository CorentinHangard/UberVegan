var mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants" },
  name: String,
  description: String,
  price: Number,
  img: String,
  category: String,
});

module.exports = mongoose.model("Articles", articlesSchema);
