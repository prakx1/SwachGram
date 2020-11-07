var express = require("express");
const auth = require("../middleware/auth");
const Citizen = require("../models/citizen");
const Complain = require("../models/complains");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

var router = express.Router();

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  Complain.find()
    .populate("author", "displayName _id")
    .sort("-createdAt")
    .then((complaints) => {
      complaints = complaints;
      console.log(complaints[0].author.displayName);

      res.render("Home", {
        complaints: complaints,
      });
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;

module.exports = router;
