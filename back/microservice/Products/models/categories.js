var mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurants'},
  name: String,
});

module.exports = mongoose.model("Categories", categoriesSchema);