const express = require('express');
const router = express.Router();
const visitsController = require('../controllers/visits.js');

// tags
router.get('/summary', function (req, res) {
  if (!req.user) {
    res.send({ error: 'You are not logged in' });
    return;
  }
  if (req.user.toJSON().role !== 'admin') {
    res.send({ error: 'You are not admin' });
    return;
  }
  visitsController.getVisitsSummary(req, res);
});

router.get('/summary-by-page', function (req, res) {
  if (!req.user) {
    res.send({ error: 'You are not logged in' });
    return;
  }
  if (req.user.toJSON().role !== 'admin') {
    res.send({ error: 'You are not admin' });
    return;
  } visitsController.getVisitsSummaryByPage(req, res);
});

module.exports = router;