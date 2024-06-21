const mongoose = require("mongoose");

const grivencesSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    zip: {
      type: String,
      required: true,
      unique: true,
    },
    comments: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Greviences", grivencesSchema);
