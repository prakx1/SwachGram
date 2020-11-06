const express = require("express");
const router = express.Router();
const passport = require("passport");
const { stopAuthfromLogin, ensureAuth } = require("../middleware/auth");
//Auth with google passport strategy

router.get(
  "/google",
  stopAuthfromLogin,
  passport.authenticate("google", { scope: ["profile"] })
);
console.log("here");
//Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/feed");
  }
);
//Logout rout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
