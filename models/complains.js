const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const complainSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Citizen",
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
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Work Pending",
  },
});

module.exports = mongoose.model("Complain", complainSchema);
