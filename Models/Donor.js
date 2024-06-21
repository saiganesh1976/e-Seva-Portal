const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: {
    type: String, // Change to String to accommodate the '91' prefix
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bloodgroup: String,
  gender: String,
  street: String,
  city: String,
  state: String,
});

// Middleware to ensure phone number starts with '91'
donorSchema.pre('save', function (next) {
  if (!this.phonenumber.startsWith('91')) {
    this.phonenumber = '91' + this.phonenumber;
  }
  next();
});

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
