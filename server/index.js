// dotenv
require('dotenv').config();

// dependancies
const path = require('path');
const express = require('express');
const cors = require('cors');
// const multer = require('multer');

// imports
const controllers = require('./controllers/post.js');
// const imageController = require('./controllers/images.js');
const logger = require('../middleware/logger.js');

// express app
const app = express();

// multer, for interpreting images
// const storage = multer.memoryStorage();
// const upload = multer({storage});

// body interpreters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors({
//   origin: '*',
// }));
// app.use(cors());
app.use(logger);

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
  console.log('getting post info')
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
// app.post('/image_component', upload.single('image'), function(req, res) {
//   const { file } = req;
//   console.log(file);

//   if (!file) return res.sendStatus(400);
//   return res.status(200).send('got file');
// })

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
