var mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurants" },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profiles" },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Articles" }],
  date: { type: Date, default: Date.now },
  totalPrice: Number,
  status: String,
});

module.exports = mongoose.model("Orders", ordersSchema);
