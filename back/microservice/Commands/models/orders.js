var mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurants'},
  profileId: {type: Schema.Types.ObjectId, ref: 'Profiles'},
  content: [{type: Schema.Types.ObjectId, ref: 'Articles'}],
  date: {type: Date, default: Date.now},
  totalPrice: Number,
  status: String,
});

module.exports = mongoose.model("Orders", ordersSchema);