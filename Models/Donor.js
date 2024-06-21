const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: String,
  email: String,
  bloodgroup: String,
  gender: String,
  street: String,
  city: String,
  state: String,
});

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
