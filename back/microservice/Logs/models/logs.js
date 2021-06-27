var mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
  type: String,
  date: {type: Date, default: Date.now},
  content: String,
});

module.exports = mongoose.model("Logs", logsSchema);