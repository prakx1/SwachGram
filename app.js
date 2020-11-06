var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const guestRouter = require("./routes/guest");
//Load config
dotenv.config({ path: "./config/config.env" });
console.log(process.env.GOOGLE_CLIENT_ID);

//Passport config
require("./config/passport")(passport);

//Connecting to database
connectDB();

//Load routes
var indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const { Mongoose } = require("mongoose");
const { ensureAuth } = require("./middleware/auth");
var app = express();

const PORT = process.env.PORT || 5000;

console.log(PORT);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV)
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use("/", guestRouter);

app.use("/auth", authRouter);
app.use("/feed", indexRouter);
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
