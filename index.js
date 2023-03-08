const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userdetail = require("./models/signup");
const adminmodel = require("./models/admin");
const moviemodel = require("./models/movies");
const bookmodel = require("./models/booking");
const seatdatamodel = require("./models/seatmodel");

//admin user email: prakash@gmail.com ---- password:prakash1234
//mongo atlas user: admin --- password:KHjs0Er1c345KzCD

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin:KHjs0Er1c345KzCD@moviebookingapp.mllugo4.mongodb.net/moviebookingapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.get("/api/movielist/", (req, res) => {
  moviemodel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get(`/api/bookedmovies/`, (req, res) => {
  bookmodel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get(`/api/ceatsbooked/`, (req, res) => {
  const moviename = req.query.moviename;
  const bookingdate = req.query.bookingdate;
  console.log(moviename, bookingdate);
  seatdatamodel.find(
    { moviename: moviename, bookingdate: bookingdate },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
      console.log(result);
    }
  );
});

app.delete(`/api/cancelbooking/`, async (req, res) => {
  const email = req.query.email;
  const moviename = req.query.moviename;
  const ceatnames = req.query.ceatnames;
  console.log(email, moviename);
  await bookmodel.remove({
    email: email,
    moviename: moviename
  });
  await seatdatamodel.remove({
    moviename: moviename,
    ceatnames: ceatnames
  });
});

app.delete(`/api/deletemovie/`, async (req, res) => {
  const moviename = req.query.moviename;
  await moviemodel.remove({
    moviename: moviename
  });
});

app.get("/api/retrieve/:password", (req, res) => {
  const password = req.params.password;
  userdetail.find({ password: password }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get(`/api/mybooking/`, (req, res) => {
  const email = req.query.email;
  const mobile = req.query.mobile;
  console.log(email, mobile);
  bookmodel.find({ email: email, mobile: mobile }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/api/admin/:password", (req, res) => {
  const password = req.params.password;
  console.log(password);
  adminmodel.find({ password: password }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.post("/api/insert", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const mobile = req.body.mobile;
  console.log(name, email, password, address, mobile);
  const signup = new userdetail({
    name: name,
    email: email,
    password: password,
    address: address,
    mobile: mobile
  });
  try {
    await signup.save();
    res.send("Your Registration Was Successfull");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/booknow", async (req, res) => {
  const currentdate = req.body.currentdate;
  const username = req.body.username;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const bookingdate = req.body.bookingdate;
  const moviename = req.body.moviename;
  const moviewatchers = req.body.moviewatchers;
  const totalceats = req.body.totalceats;
  const ceatnames = req.body.ceatnames;
  const totalcost = req.body.totalcost;
  console.log(
    currentdate,
    username,
    email,
    mobile,
    bookingdate,
    moviename,
    moviewatchers,
    totalceats,
    ceatnames,
    totalcost
  );

  const bookdata = new bookmodel({
    currentdate: currentdate,
    username: username,
    email: email,
    mobile: mobile,
    bookingdate: bookingdate,
    moviename: moviename,
    moviewatchers: moviewatchers,
    totalceats: totalceats,
    ceatnames: ceatnames,
    totalcost: totalcost
  });
  try {
    await bookdata.save();
    res.send("Ticket booked successfully");
  } catch (error) {
    console.log(error);
  }

  const movieseatdata = new seatdatamodel({
    bookingdate: bookingdate,
    moviename: moviename,
    ceatnames: ceatnames
  });
  try {
    await movieseatdata.save();
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/movieupload", async (req, res) => {
  const movieimageurl = req.body.movieimageurl;
  const movievideourl = req.body.movievideourl;
  const moviename = req.body.moviename;
  const ticketcost = req.body.ticketcost;
  const moviedescription = req.body.moviedescription;
  const actorname = req.body.actorname;
  const directorname = req.body.directorname;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  console.log(
    movieimageurl,
    movievideourl,
    moviename,
    ticketcost,
    moviedescription,
    actorname,
    directorname,
    startdate,
    enddate
  );
  const moviedata = new moviemodel({
    movieimageurl: movieimageurl,
    movievideourl: movievideourl,
    moviename: moviename,
    ticketcost: ticketcost,
    moviedescription: moviedescription,
    actorname: actorname,
    directorname: directorname,
    startdate: startdate,
    enddate: enddate
  });
  try {
    await moviedata.save();
    res.send("Movie Added Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
