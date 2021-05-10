const express = require("express");
const db = require("../models/index");

// Database Reference
const { User, Ongoing, Completed } = db;
const router = express.Router();

// Book New Ride
router.post("/book", (req, res) => {
  if (req.body.driver && req.body.passenger)
    Ongoing.findAll({ where: { driver: req.body.driver } || { passenger: req.body.passenger }, raw: false })
      .then((ride) => {
        if (ride) res.status(401).json({ success: false, message: "Ride cannot be booked" });
        else
          Ongoing.create({
            driver: req.body.driver,
            passenger: req.body.passenger,
            origin: { type: "Point", coordinates: [39.807222, -76.984722] },
            destination: { type: "Point", coordinates: [39.807222, -76.984722] },
          })
            .then((rideNew) => res.status(200).json({ success: true, result: rideNew }))
            .catch(() => res.status(401).json({ success: false, message: "Error Booking Ride" }));
      })
      .catch((err) => res.status(401).json({ success: false, message: err }));
  else res.status(401).json({ success: false, message: "Insufficient Information to Book" });
});

// Check Available Cabs
router.get("/check", (req, res) => {
  User.findAll({ where: { type: "driver" }, raw: false })
    .then((result) => res.status(200).json({ success: true, message: result }))
    .catch(() => res.status(401).json({ success: false, message: "Cabs not available" }));
});

// Finish Ongoing Rides
router.post("/finish/:id", (req, res) => {
  const travelId = req.params.id;
  Ongoing.findOne({ where: { id: travelId }, raw: false })
    .then((result) => {
      if (result !== {})
        Completed.create({
          driver: result.driver,
          passenger: result.passenger,
          origin: result.origin,
          destination: result.destination,
        })
          .then((result) => {
            Ongoing.delete({ where: { id: travelId }, raw: false })
              .then(() => res.status(200).json({ success: true, result: "Ride is ended" }))
              .catch(() => res.status(401).json({ success: false, message: "Error Finishing Ride 3" }));
          })
          .catch(() => res.status(401).json({ success: false, message: "Error Finishing Ride 2" }));
    })
    .catch(() => res.status(401).json({ success: false, message: "Error Finishing Ride 1" }));
});

// Get Completed Rides
router.get("/completed", (req, res) => {
  Completed.findAll({ where: { passenger: req.body.id }, raw: false })
    .then((result) => res.status(200).json({ success: true, message: result }))
    .catch((err) => res.status(401).json({ success: false, message: err }));
});

module.exports = router;
