const express = require('express');
const multer = require('multer');

// multer, for interpreting images
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const router = express.Router();
const postController = require('../controllers/post.js');
const imageScrollerController = require('../controllers/imageScrollers.js');

router.post('/', upload.single('image'), function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageScrollerController.uploadImageForScroller(req, res);
});

router.put('/', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageScrollerController.addOrUpdateImageScrollerComponent(req, res);
});

router.delete('/', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  postController.deleteComponent(req, res);
  imageScrollerController.deleteImages(req, res);
});

router.put('/imageToScroller', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageScrollerController.convertImageToImageScroller(req, res);
});

router.put('/scollerToImage', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageScrollerController.convertImageScrollerToImage(req, res);
});

// just use the PUT '/' route
// router.put('/updateImageScrollerOrder', function (req, res) {
//   if (!req.user) return;
//   if (req.user.toJSON().role !== 'admin') return;
//   imageScrollerController.updateImageScrollerOrder(req, res);
// });

module.exports = router;
