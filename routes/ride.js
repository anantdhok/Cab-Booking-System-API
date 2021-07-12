const express = require("express");
const db = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

// Database Reference
const { User, Ongoing, Completed } = db;
const router = express.Router();

// Book New Ride
router.post("/book", (req, res) => {
  if (req.body.driver && req.body.passenger && req.body.origin && req.body.destination) {
    User.findAll({
      where: {
        [Op.or]: [
          { id: req.body.driver, type: "driver" },
          { id: req.body.passenger, type: "client" },
        ],
      },
      raw: false,
    })
      .then((users) => {
        if (users.length === 2) {
          Ongoing.findAll({
            where: {
              [Op.or]: [
                { driver: { [Op.or]: [req.body.driver, req.body.passenger] } },
                { passenger: { [Op.or]: [req.body.passenger, req.body.driver] } },
              ],
            },
            raw: false,
          })
            .then((ride) => {
              if (ride.length > 0) res.status(401).json({ success: false, message: "Ride cannot be booked" });
              else
                Ongoing.create({
                  driver: req.body.driver,
                  passenger: req.body.passenger,
                  origin: { type: "Point", coordinates: [req.body.origin.x, req.body.origin.y] },
                  destination: { type: "Point", coordinates: [req.body.destination.x, req.body.destination.y] },
                })
                  .then((rideNew) => res.status(200).json({ success: true, result: rideNew }))
                  .catch(() => res.status(401).json({ success: false, message: "Cannot process request" }));
            })
            .catch((err) => res.status(401).json({ success: false, message: "Cannot process request" }));
        } else res.status(401).json({ success: false, message: "User information is invalid" });
      })
      .catch((err) => res.status(401).json({ success: false, message: "Cannot process request" }));
  } else res.status(401).json({ success: false, message: "Insufficient information to book" });
});

// Check Available Cabs
router.get("/check", (req, res) => {
  User.findAll({
    where: sequelize.literal("type='driver' AND id NOT IN (SELECT driver FROM Ongoings)"),
    raw: false,
  })
    .then((result) => {
      res.status(200).json({ success: true, message: result });
    })
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
          .then(() => {
            User.update(
              { location: result.destination },
              { where: { id: { [Op.or]: [result.driver, result.passenger] } }, raw: false }
            );
            Ongoing.destroy({ where: { id: travelId }, raw: false })
              .then(() => res.status(200).json({ success: true, result: "Ride is ended" }))
              .catch(() => res.status(401).json({ success: false, message: "Cannot process request" }));
          })
          .catch(() => res.status(401).json({ success: false, message: "Cannot process request" }));
    })
    .catch(() => res.status(401).json({ success: false, message: "Cannot process request" }));
});

// Get Completed Rides
router.get("/completed", (req, res) => {
  Completed.findAll({ where: { passenger: req.body.id }, raw: false })
    .then((result) => res.status(200).json({ success: true, message: result }))
    .catch((err) => res.status(401).json({ success: false, message: err }));
});

module.exports = router;
