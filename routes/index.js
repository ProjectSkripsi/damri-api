const express = require('express');
const router = express.Router();
const user = require('./users')
const technician = require('./technician')
const bus = require('./bus')

router.use('/api/users', user)
router.use('/api/technician', technician)
router.use('/api/bus', bus)

module.exports = router;
