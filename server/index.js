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

app.all('/api/*', (req, res) => {
  const { method } = req;
  const url = req.url.replace('/api', '');

  axios({
    method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${url}`,
    data: req.body,
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`listening on ${PORT}`); });
