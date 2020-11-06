const mongoose = require("mongoose");

const citezenSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  socialstars: {
    type: Number,
  },
});
module.exports = ("Citezen", citezenSchema);
