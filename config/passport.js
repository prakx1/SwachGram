const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const Citizen = require("../models/citizen");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newCitizen = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let citizen = await Citizen.findOne({ googleId: profile.id });
          if (citizen) {
            done(null, citizen);
          } else {
            citizen = await Citizen.create(newCitizen);
            done(null, citizen);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((citizen, done) => {
    done(null, citizen.id);
  });

  passport.deserializeUser((id, done) => {
    Citizen.findById(id, (err, citizen) => done(err, citizen));
  });
};
