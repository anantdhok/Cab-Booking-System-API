const express = require("express");
const db = require("../models/index");

// Database Reference
const { Ongoing, Completed } = db;
const router = express.Router();

// Register API
router.post("/book", (req, res) => {
  if (req.body.driver && req.body.passenger)
    Ongoing.findOne({ where: { driver: req.body.driver } || { passenger: req.body.passenger }, raw: false })
      .then((ride) => {
        if (ride) res.status(401).json({ success: false, message: "Ride cannot be booked" });
        else {
          Ongoing.create({
            driver: req.body.driver,
            passenger: req.body.passenger,
            origin: { type: "Point", coordinates: [39.807222, -76.984722] },
            destination: { type: "Point", coordinates: [39.807222, -76.984722] },
          })
            .then((rideNew) => {
              res.status(200).json({
                success: true,
                result: rideNew,
              });
            })
            .catch(() => {
              res.status(401).json({ success: false, message: "Error Booking Ride" });
            });
        }
      })
      .catch((err) => {
        res.status(401).json({ success: false, message: err });
      });
  else res.status(401).json({ success: false, message: "Insufficient Information to Book" });
});

// Check Available Cabs
router.post("/check", (req, res, done) => {
  return Ongoing.find({ where: { type: "driver" }, raw: false }).then((result) => {
    res.status(200).json({
      success: true,
      message: result,
    });
  });
});

// Get ride API
router.post("/finish/:id", (req, res) => {
  const clientId = req.params.id;
  Ongoing.findOne({ where: { id: clientId }, raw: false }).then((result) => {
    Ongoing.deleteOne({ where: { id: result.id }, raw: false })
      .then((result) => {
        Completed.create({
          driver: result.driver,
          passenger: result.passenger,
          origin: result.passenger,
          destination: result.passenger,
        })
          .then((rideNew) => {
            res.status(200).json({
              success: true,
              result: rideNew,
            });
          })
          .catch(() => {
            res.status(401).json({ success: false, message: "Error Finishing Ride" });
          });
      })
      .catch(() => {
        res.status(401).json({ success: false, message: "Error Finishing Ride" });
      });
  });
});

// Get ride API
router.get("/completed", (req, res) => {
  return Ongoing.findOne({ where: { id: clientId }, raw: false }).then((result) => {
    res.status(200).json({
      success: true,
      message: result,
    });
  });
});

module.exports = router;
