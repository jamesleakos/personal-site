const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.js');

// tags
router.get('/:page_name', function (req, res) {
  trackingController.track(req, res);
});

module.exports = router;