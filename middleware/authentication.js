const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const User = require("../models/userModel");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      console.log("jwtPayload: ", jwtPayload);
      // Find the user based on the ID in jwtPayload
      const user = await User.findById(jwtPayload.id);

      if (user) {
        console.log("User found: ", user);
        return done(null, user);
      } else {
        console.log("User not found");
        return done(null, false);
      }
    } catch (error) {
      console.log("Error in passport.use:");
      return done(error, false);
    }
  })
);

// Custom authentication middleware using Passport
const authenticateMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User authenticated: ", user);
    req.user = user; // Set req.user to the authenticated user object
    return next();
  })(req, res, next);
};

module.exports = authenticateMiddleware;
