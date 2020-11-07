const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citizenSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
  },
  firstName: {
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
  complaints: [
    {
      type: Schema.Types.ObjectId,
      ref: "complains",
    },
  ],
});
module.exports = mongoose.model("Citizen", citizenSchema);
