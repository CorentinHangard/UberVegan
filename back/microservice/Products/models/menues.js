var mongoose = require("mongoose");

const menuesSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants" },
  name: String,
  description: String,
  price: Number,
  img: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Articles" }],
});

module.exports = mongoose.model("Menues", menuesSchema);
