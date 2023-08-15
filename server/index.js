// dotenv
require('dotenv').config();

// dependancies
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./passport/setup.js');
const authRouter = require('./routers/auth.js');

// imports
// THIS IS NEEDED to call the db file even if we don't use the output
const db = require('../db');
const logger = require('../middleware/logger.js');

// routers
const postRouter = require('./routers/posts.js');
const componentRouter = require('./routers/components.js');
const imageComponentRouter = require('./routers/image_components.js');
const imageScrollerComponentRouter = require('./routers/image_scroller_components.js');
const tagRouter = require('./routers/tags.js');
const poemRouter = require('./routers/poems.js');
const trackingRouter = require('./routers/tracking.js');

// express app
const app = express();
// app.use(logger);

// auth
// Express Session

const mongoURI = `mongodb+srv://${process.env.MONGO_CLOUD_ATLAS_USER}:${process.env.MONGO_CLOUD_ATLAS_PASSWORD}@${process.env.MONGO_CLOUD_ATLAS_URL}/${process.env.MONGO_CLOUD_ATLAS_DB}`;

app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoURI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/image_scroller_components', imageScrollerComponentRouter);
app.use('/tags', tagRouter);
app.use('/auth', authRouter);
app.use('/poems', poemRouter);
app.use('/page', trackingRouter);

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
