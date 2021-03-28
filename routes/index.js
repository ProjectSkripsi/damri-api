const express = require("express");
const router = express.Router();
const user = require("./users");
const technician = require("./technician");
const bus = require("./bus");
const upload = require("./upload");
const schedule = require("./schedule");
const criteria = require("./criteria");

router.use("/api/users", user);
router.use("/api/technician", technician);
router.use("/api/bus", bus);
router.use("/api/upload", upload);
router.use("/api/schedule", schedule);
router.use("/api/criteria", criteria);

module.exports = router;
