const mongoose = require("mongoose");

const bookingData = new mongoose.Schema({
  currentdate: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  mobile: {
    type: Number,
    required: true
  },
  bookingdate: {
    type: String,
    required: true
  },
  moviename: {
    type: String,
    required: true
  },
  moviewatchers: {
    type: String,
    required: true
  },
  totalceats: {
    type: Number,
    required: true
  },
  ceatnames: {
    type: String,
    required: true
  },
  totalcost: {
    type: Number,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const bookmodel = mongoose.model("booking", bookingData);

module.exports = bookmodel;
