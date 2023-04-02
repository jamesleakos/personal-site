const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poems.js');

// poems
router.get('/', function (req, res) {
  poemController.getAllPoems(req, res);
});

// one poem
router.get('/:poem_id', function (req, res) {
  if (!req.query.poem_id) req.query.poem_id = req.params.poem_id;
  poemController.getOnePoem(req, res);
});

router.put('/', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  poemController.addOrUpdatePoem(req, res);
});

router.delete('/:poem_id', function (req, res) {
  console.log('req.user', req.user);
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  if (!req.query.poem_id) req.query.poem_id = req.params.poem_id;
  poemController.deletePoem(req, res);
});

module.exports = router;
