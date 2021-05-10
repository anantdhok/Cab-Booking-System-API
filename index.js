const cors = require("cors");
const http = require("http");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const rideRouter = require("./routes/ride");
require("dotenv").config();

// Application
const app = express(),
  port = process.env.PORT || 5000,
  server = http.createServer(app);

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Route Endpoints
app.use("/", apiRouter);
app.use("/auth", authRouter);
app.use("/ride", rideRouter);

// Initialize
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
