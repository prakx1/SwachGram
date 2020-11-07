var express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");
const Complain = require("../models/complains");
const Citizen = require("../models/citizen");
const multer = require("multer");
var router = express.Router();

router.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/complaints_images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
});

/* Create complain route */
router.post("/", upload.single("image"), function (req, res, next) {
  const userId = req.user._id;
  console.log(req.file);
  console.log(userId);
  Citizen.findById(userId)
    .then((user) => {
      if (!user) {
        console.log(user);
        res.render("error");
      } else {
        const complain = Complain({
          title: req.body.complain_text,
          author: userId,
          image: req.file.filename,
          location: req.body.location,
        });
        complain
          .save()
          .then((saved) => {
            user.complaints.push(complain._id);
            user
              .save()
              .then((success) => {
                console.log(user);
                res.redirect("/feed");
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
