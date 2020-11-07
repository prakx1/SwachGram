var express = require("express");
const auth = require("../middleware/auth");
const citizen = require("../models/citizen");
const Citizen = require("../models/citizen");
const Complains = require("../models/complains");
var router = express.Router();

/* GET Mycomplaints page. */
router.get("/", function (req, res, next) {
  const userId = req.user._id;
  if (req.user) {
    citizen
      .findById(userId)
      .sort("-createdAt")
      .populate({ path: "complaints" })
      .then((user) => {
        complaints = user.complaints;
        console.log(complaints);
        res.render("myComplaints", {
          user: user,
          complaints: complaints,
        });
      })

      .catch((err) => {
        next(err);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
