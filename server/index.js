// dotenv
require('dotenv').config();

// dependancies
const path = require('path');
const express = require('express');
const axios = require('axios');
const multer = require('multer');

// imports
const db = require('../db');
const controllers = require('./controllers/post.js');
const logger = require('../middleware/logger.js');

// express app
const app = express();

// body interpreters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// multer stuff
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/`);
  },
  filename: function (req, file, cb) {
    // Use the original file name and add the original file extension
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// sending static
app.use(express.static(path.join(__dirname, '../client/dist')));

// post and component routes for mongo

// POSTS
// this one should almost never be used probably
app.get('/posts', function(req, res) {
  controllers.getAllPosts(req, res);
})
// this one is used to get the info for post list and other post displays
app.get('/posts/info', function(req, res) {
  controllers.getPostsInfo(req, res);
})
// get a single full post
app.get('/posts/:post_id', function(req, res) {
  if (!req.query.post_id) req.query.post_id = req.params.post_id;
  controllers.getPost(req, res);
})
// add a post
app.post('/posts', function(req, res) {
  console.log(req.body);
  controllers.addPost(req, res);
})
// update a post
app.put('/posts', function(req, res) {
  controllers.updatePost(req, res);
})
// delete a post
app.delete('/posts', function(req, res) {
  controllers.deletePost(req, res);
})

// COMPONENTS
// this both adds and updates a component
app.put('/components', function(req, res) {
  controllers.addOrUpdateTextComponent(req, res);
})

app.delete('/components', function(req, res) {
  controllers.deleteComponent(req, res);
})

// PICTURES
app.post('/upload', upload.array('images'), (req, res) => {
  // 'images' is the name of the file input field in the HTML form
  // req.files is an array of uploaded files
  req.files.forEach((file) => {
    console.log(file.originalname);
  });
  res.send('Files uploaded successfully');
});

app.get('/uploads/:filename', (req, res) => {
  const file = `../uploads/${req.params.filename}`;
  res.sendFile(file);
});

// not sure what this is for
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// run the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on ${PORT}`); });
