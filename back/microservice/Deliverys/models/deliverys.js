var mongoose = require("mongoose");

const deliverysSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profiles" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
  delivererId: { type: mongoose.Schema.Types.ObjectId, ref: "Profiles" },
  status: String,
});

module.exports = mongoose.model("Deliverys", deliverysSchema);
