const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const setRoutes = require("./setRoutes");
const config = require("./config");

const app = express();
// app.set('views', './views');
// app.set('view engine', 'pug');
// app.set('secretKey', config.jwtSecret);

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Nonce, Signature, Timestamp, No-Cache, Client-Request"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

setRoutes(app, "./api", true, "api");
setRoutes(app, "./controllers", false);

// connect to Mongodb
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongodb is connected successfully");
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log(`Mongodb connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb connection is disconnected");
});

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// To generate Admin account
// const genAdmin = require('./utils/generateAdmin');
// genAdmin()

app.listen(config.port, () => {
  console.log(`App running on port ${config.port}`);
});
