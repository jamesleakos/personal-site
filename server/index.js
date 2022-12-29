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

// getting posts from mongo 
app.get('/posts', function(req, res) {
  controllers.getAllPosts(req, res);
})

app.get('/posts/:post_id', function(req, res) {
  console.log('get post with id')
})

app.post('/posts', function(req, res) {
  console.log(req.body);
  controllers.addPost(req, res);
})

app.put('/posts/:post_id', function(req, res) {
  console.log('put post with id');
})

// upload routes
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
