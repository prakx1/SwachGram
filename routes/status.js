var express = require("express");
const Citizen = require("../models/citizen");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Complain = require("../models/complains");

var router = express.Router();
//Not registerd user redirected to login
router.get("/:id", function (req, res, next) {
  if (req.user.role == "Worker") {
    console.log(req.params, req.query);
    var complain_id = req.params.id;
    Complain.findByIdAndUpdate(complain_id, { status: req.query.status })
      .then((success) => {
        res.render("success", {
          message: "Status was updated successfully!!!!",
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
