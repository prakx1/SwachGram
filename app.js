var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Load config
dotenv.config({ path: "./config/config.env" });
console.log(process.env.GOOGLE_CLIENT_ID);

//Passport config
require("./config/passport")(passport);

//Connecting to database
connectDB();

//Load routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/auth");
const authRouter = require("./routes/auth");
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
    secret: "jai bhadrakali",
    resave: false,
    saveUninitialized: true,
  })
);
//Passport middleware
passport.use(passport.initialize());
passport.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
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
