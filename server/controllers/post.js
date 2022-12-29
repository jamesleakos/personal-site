const { default: mongoose } = require('mongoose');
const { Post, TextComponent, ImageComponent } = require('../../db/models/Post.js');

exports.getAllPosts = (req, res) => {
  Post.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
};

exports.addPost = (req, res) => {
  Post.create({
    _id: new mongoose.Types.ObjectId(),
    created_at: req.body.created_at,
    published: req.body.published,
    published_at: req.body.published_at,
    featured: req.body.featured,
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
};