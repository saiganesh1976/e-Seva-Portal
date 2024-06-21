const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  location: String,
  landmark: String,
  phonenumber: String,
  vechile_number: String,
  fueltype: String,
  service_required: String,
  quantity: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
