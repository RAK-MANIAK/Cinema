const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cinema must have a name'],
    unique: true,
  },
  imageCover: {
    type: String,
    default: 'images/default/cinema.jpg',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    city: {
      type: String,
      required: [true, 'Cinema must have a city'],
    },
    address: String,
    description: String,
  },
});

cinemaSchema.index({ name: 1, 'location.city': 1 }, { unique: true });

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
