var express = require("express");
const Citizen = require("../models/citizen");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const citizen = require("../models/citizen");

var router = express.Router();
//Not registerd user redirected to login
router.get("/", function (req, res, next) {
  res.render("role");
});

router.post("/", function (req, res, next) {
  var userId = req.user._id;
  var role = req.body.role;
  var location = req.body.location;
  console.log(role, location);
  Citizen.findByIdAndUpdate(userId, { role: role, location: location })
    .then((success) => {
      res.redirect("/feed");
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
