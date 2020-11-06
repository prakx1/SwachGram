var express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

var router = express.Router();

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  res.render("Home", { title: "SwachGram" });
});

module.exports = router;
