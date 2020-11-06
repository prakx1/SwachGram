const express = require("express");
const router = express.Router();
const passport = require("passport");
//Auth with google passport strategy

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/users");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
