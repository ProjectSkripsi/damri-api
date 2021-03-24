require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
const mongoose = require("mongoose");

const database = process.env.DATABASE;

let saslprep;
try {
  saslprep = require("saslprep");
} catch (e) {}

mongoose.connect(database, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Database is Connecting`);
});
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public/images"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", indexRouter);

module.exports = app;
