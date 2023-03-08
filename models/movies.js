const mongoose = require("mongoose");

const movieData = new mongoose.Schema({
  movieimageurl: {
    type: String,
    required: true
  },
  movievideourl: {
    type: String,
    required: true
  },
  moviename: {
    type: String,
    required: true
  },

  ticketcost: {
    type: Number,
    required: true
  },
  moviedescription: {
    type: String,
    required: true
  },
  actorname: {
    type: String,
    required: true
  },
  directorname: {
    type: String,
    required: true
  },
  startdate: {
    type: String,
    required: true
  },
  enddate: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const moviemodel = mongoose.model("movies", movieData);

module.exports = moviemodel;
