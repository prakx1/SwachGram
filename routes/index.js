var express = require("express");
const auth = require("../middleware/auth");
const Citizen = require("../models/citizen");
const Complain = require("../models/complains");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

var router = express.Router();

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  var role = req.user.role;
  var user_location = req.user.location;
  console.log(req.user.role);
  Complain.find()
    .populate("author", "displayName _id")
    .where("location")
    .equals(req.user.location)
    .sort("-createdAt")
    .then((complaints) => {
      complaints = complaints;
      // console.log(complaints[0].author.displayName);

      res.render("Home", {
        complaints: complaints,
        role: role,
        user_location: user_location,
      });
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;

module.exports = router;
