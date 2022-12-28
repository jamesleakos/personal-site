require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const logger = require('../middleware/logger.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
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
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api', function(req, res) {
  console.log('api call');
})

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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on ${PORT}`); });
