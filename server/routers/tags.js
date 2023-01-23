const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tags.js');

// tags
router.get('/', function (req, res) {
  tagController.getAllTags(req, res);
});

router.put('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  tagController.addOrUpdateTag(req, res);
});

router.delete('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  tagController.deleteTag(req, res);
});

module.exports = router;
