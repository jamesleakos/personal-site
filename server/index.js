// dotenv
require('dotenv').config();

// dependancies
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

// imports
// THIS IS NEEDED to call the db file even if we don't use the output
const db = require('../db');

// routers
const postRouter = require('./routers/posts.js');
const componentRouter = require('./routers/components.js');
const imageComponentRouter = require('./routers/image_components.js');
const tagRouter = require('./routers/tags.js');

// express app
const app = express();

// body interpreters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors({ origin: '*' }));

// compression
app.use(compression());

// sending static
app.use(express.static(path.join(__dirname, '../client/dist')));

//routes
app.use('/posts', postRouter);
app.use('/components', componentRouter);
app.use('/image_components', imageComponentRouter);
app.use('/tags', tagRouter);

// needed to send the base files
app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// run the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
