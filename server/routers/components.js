const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.js');

// this both adds and updates a component
router.put('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.addOrUpdateTextComponent(req, res);
});

router.delete('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.deleteComponent(req, res);
});

router.patch('/reorder', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.reorderComponent(req, res);
});

module.exports = router;
