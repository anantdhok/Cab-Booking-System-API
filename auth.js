const express = require("express");
const db = require("../models/index");
const bcrypt = require("bcrypt");

// Database Reference
const { User } = db;
const router = express.Router();

// Passport Initialize
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const saltRounds = 10;
const duration = 3600;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "HelloImSecret";

// Passport Middleware
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//  Passport Authenticaton
passport.use(
  "clientLocal",
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { email: username }, raw: false })
      .then((user) => {
        if (!user) return done(null, false, { message: "Incorrect username." });
        if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      })
      .catch((err) => (null, false, err));
  })
);

passport.use(
  "clientJwt",
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findOne({ where: { id: jwtPayload.id }, raw: false })
      .then((user) => {
        if (!user) return done(null, false, { message: "Incorrect user." });
        return done(null, user);
      })
      .catch((err) => (null, false, err));
  })
);

// Register API
router.post("/register", (req, res) => {
  if (req.body.username && req.body.password)
    User.findOne({ where: { email: req.body.username }, raw: false })
      .then((user) => {
        if (user) res.status(401).json({ success: false, message: "Username already exists" });
        else {
          const hash = bcrypt.hashSync(req.body.password, saltRounds);
          User.create({
            email: req.body.username,
            password: hash,
            name: req.body.name,
            phone: req.body.phone,
            type: "client",
            location: { type: "Point", coordinates: [39.807222, -76.984722] },
          })
            .then((userNew) => {
              const payload = { id: userNew.id };
              const response = jwt.sign(payload, process.env.JWT_SECRET);
              res.status(200).json({
                success: true,
                result: response,
              });
            })
            .catch(() => {
              res.status(401).json({ success: false, message: "Error Creating User" });
            });
        }
      })
      .catch((err) => {
        res.status(401).json({ success: false, message: err });
      });
  else res.status(401).json({ success: false, message: "Insufficient Information to register" });
});

// Login API
router.post("/login", (req, res, done) => {
  passport.authenticate("clientLocal", (err, user, info) => {
    // will generate a 500 error
    if (err) return done(err);

    // Generate a JSON response reflecting authentication status
    if (!user) return res.status(401).json({ success: false, info });

    req.login(user, (loginErr) => {
      if (loginErr) return done(loginErr);
      const payload = { id: req.user.id };
      const access = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
      return res.status(200).json({
        success: true,
        token: access,
      });
    });
  })(req, res, done);
});

// Get User API
router.get("/:id", passport.authenticate(["clientLocal"], { session: false }), (req, res) => {
  const clientId = req.params.id;
  return User.findOne({ where: { id: clientId }, raw: false }).then((result) => {
    res.status(200).json({
      success: true,
      message: result,
    });
  });
});

module.exports = router;
