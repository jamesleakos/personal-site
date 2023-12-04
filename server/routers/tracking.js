const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.js');

// tracking saves the visit to the database - visits returns the visits data
router.post('/:page_name', function (req, res) {
  trackingController.track(req, res);
});

module.exports = router;
