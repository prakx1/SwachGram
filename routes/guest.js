var express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

var router = express.Router();
//Not registerd user redirected to login
router.get("/", ensureGuest, function (req, res, next) {
  res.render("login", { title: "SwachGram" });
});
module.exports = router;
