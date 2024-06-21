const mongoose = require("mongoose");

const fasttagSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: String,
  state: String,
  phonenumber: {
    type: Number,
    required: true,
    unique: true,
  },
  vechilenumber: String,
  company: String,
  licence: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Fasttag = mongoose.model("Fasttag", fasttagSchema);

module.exports = Fasttag;
