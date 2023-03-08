const mongoose = require("mongoose");

const seatData = new mongoose.Schema({
  bookingdate: {
    type: String,
    required: true
  },
  moviename: {
    type: String,
    required: true
  },
  ceatnames: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const seatdatamodel = mongoose.model("movieceats", seatData);

module.exports = seatdatamodel;
