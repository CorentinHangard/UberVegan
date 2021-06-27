var mongoose = require('mongoose');

const menuesSchema = new mongoose.Schema({
  restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurants'},
  name: String,
  description: String,
  price: Number,
  img: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'Categories'}]
});

module.exports = mongoose.model("Menues", menuesSchema);