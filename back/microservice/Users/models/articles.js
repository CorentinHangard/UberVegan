var mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
    artName: String,
    artAllergen: String,
    artCategory: String,
    restaurantId: String
});

module.exports = mongoose.model("Articles", articlesSchema);