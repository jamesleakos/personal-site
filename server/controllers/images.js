const mongoose = require('mongoose');
const { Post, TextComponent, ImageComponent, Component } = require('../../db/models/Post.js');
const s3 = require('../s3.js');

exports.uploadImage = (req, res) => {
  const post_id = req.query.post_id;

  const { file } = req;

  if (!file || !post_id) return res.sendStatus(400);

  // this is where the magic happens
  s3.uploadToS3({ file, post_id })
    .then(back => {
      return res.status(201).json({ key: back.key });    
    })
    .catch(err => {
      console.log('error is: ' + err);
      return res.status(500).json({message: err.message})
    })
};

exports.getImages = async(req, res) => {
  const post_id = req.query.post_id;

  const {error, urlObjs} = await s3.getPostPresignedUrls(post_id);
  if (error) return res.status(400).json({ message: error.message});

  return res.json(urlObjs);
}