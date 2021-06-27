var mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
  restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurants'},
  name: String,
  description: String,
  price: Number,
  img: String,
  category: {type: Schema.Types.ObjectId, ref: 'Categories'}
});

module.exports = mongoose.model("Articles", articlesSchema);