const router = require("express").Router();

router.get("/", (req, res) => res.send("Welcome at Cab Booking API Server!"));

module.exports = router;
