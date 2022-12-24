require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const logger = require('../middleware/logger.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api', function(req, res) {
  console.log('api call');
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on ${PORT}`); });
