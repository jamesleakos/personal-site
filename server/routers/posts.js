const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.js');

// this one should almost never be used probably
// router.get('/', function (req, res) {
//   postController.getAllPosts(req, res);
// });
// this one is used to get the info for post list and other post displays
router.get('/info', function (req, res) {
  postController.getPostsInfo(req, res);
});
// get a single full post
router.get('/:post_id', function (req, res) {
  if (!req.query.post_id) req.query.post_id = req.params.post_id;
  postController.getPost(req, res);
});
// add a post
router.post('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.addPost(req, res);
});
// update a post
router.put('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.updatePost(req, res);
});
// delete a post
router.delete('/', function (req, res) {
  if (!req.user) return;
  if (!req.user.role === 'admin') return;
  postController.deletePost(req, res);
});

module.exports = router;
