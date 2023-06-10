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
const imageController = require('../controllers/images.js');

router.post('/', upload.single('image'), function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageController.uploadImage(req, res);
});

// we shouldn't need this anymore - with imageKit, we no longer need presigned URLs and can get the images with
// the keys that are stored in Mongo
router.get('/', (req, res) => {
  imageController.getImages(req, res);
});

router.put('/', function (req, res) {
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  imageController.addOrUpdateImageComponent(req, res);
});

router.delete('/', function (req, res) {
  console.log('delete image component 1');
  if (!req.user) return;
  if (req.user.toJSON().role !== 'admin') return;
  // we can use the same method as the posts
  console.log('delete image component 2');
  postController.deleteComponent(req, res);

  // can get the key from the route and then send it along to the bucket
  imageController.deleteImage(req, res);
});

module.exports = router;
