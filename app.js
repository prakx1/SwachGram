var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var busboy = require("connect-busboy");
var logger = require("morgan");
const passport = require("passport");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const guestRouter = require("./routes/guest");
const addComplainRouter = require("./routes/addComplain");
const rolelocationRouter = require("./routes/roleLocation");
//Load config
dotenv.config({ path: "./config/config.env" });

//Passport config
require("./config/passport")(passport);

//Connecting to database
connectDB();

//Load routes
var myComplaintsRouter = require("./routes/myComplaints");
var indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const { ensureAuth } = require("./middleware/auth");
var app = express();

const PORT = process.env.PORT || 5000;

console.log(PORT);

if (process.env.NODE_ENV)
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  session({
    secret: "this is a top",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(function (req, res, next) {
  app.locals.auth = req.isAuthenticated();
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use("/", guestRouter);

app.use("/auth", authRouter);
app.use("/feed", indexRouter);
app.use("/addComplain", addComplainRouter);
app.use("/mycomplaints", myComplaintsRouter);
app.use("/role_location", rolelocationRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
