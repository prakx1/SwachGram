const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const complainSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "citizens",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complain", complainSchema);
