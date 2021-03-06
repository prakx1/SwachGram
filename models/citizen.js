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
  location: {
    type: String,
  },
  role: {
    type: String,
    default: "null",
  },
  complaints: [
    {
      type: Schema.Types.ObjectId,
      ref: "Complain",
    },
  ],
});
module.exports = mongoose.model("Citizen", citizenSchema);
