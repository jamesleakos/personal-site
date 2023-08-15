const express = require('express');
const router = express.Router();
const visitsController = require('../controllers/visits.js');

// tags
router.get('/summary', function (req, res) {
  visitsController.getVisitsSummary(req, res);
});

router.get('/summary-by-page', function (req, res) {
  visitsController.getVisitsSummaryByPage(req, res);
});

module.exports = router;