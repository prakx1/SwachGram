var express = require("express");
const auth = require("../middleware/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

var router = express.Router();

/* GET home page. */
router.get("/", ensureAuth, function (req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("Home", { title: "SwachGram" });
});

module.exports = router;
