var mongoose = require('mongoose');

const deliverysSchema = new mongoose.Schema({
  profileId: {type: Schema.Types.ObjectId, ref: 'Profiles'},
  orderId: {type: Schema.Types.ObjectId, ref: 'Orders'},
  delivererId: {type: Schema.Types.ObjectId, ref: 'Profiles'},
  status: String,
});

module.exports = mongoose.model("Deliverys", deliverysSchema);