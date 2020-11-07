var express = require("express");
const auth = require("../middleware/auth");
const Citizen = require("../models/citizen");
const complaints = require("../models/complaints");
var router = express.Router();

/* GET Mycomplaints page. */
router.get("/", function (req, res, next) {
  const userId = req.user._id;
});

module.exports = router;
