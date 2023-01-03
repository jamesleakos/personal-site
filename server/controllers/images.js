const mongoose = require('mongoose');
const { Post, TextComponent, ImageComponent, Component } = require('../../db/models/Post.js');

exports.uploadImage = (req, res) => {
  const post_id = req.params.post_id;
  const component_id = req.params.component_id;

  const { file } = req;
  console.log(file);

  if (!file) return res.sendStatus(400);
  return res.status(200).send('got file');
};