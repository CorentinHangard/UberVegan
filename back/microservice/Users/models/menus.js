var mongoose = require("mongoose");

const menusSchema = new mongoose.Schema({
    menRestaurant: String,
    menName: String,
    menDescription: String,
    menPrice: String,
    menPicture: String,
    menComposition: [String]
});

module.exports = mongoose.model("Menus", articlesSchema);