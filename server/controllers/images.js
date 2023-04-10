const mongoose = require('mongoose');
const { Post, TextComponent, ImageComponent, Component } = require('../../db/models/Post.js');
const s3 = require('../s3.js');

exports.uploadImage = (req, res) => {
  const post_id = req.query.post_id;

  const { file } = req;

  if (!file || !post_id) return res.sendStatus(400);

  // let's delete the old photo, if there is one to delete
  if (req.query.current_key) s3.deleteImage(req.query.current_key);

  // this is where the magic happens
  s3.uploadToS3({ file, post_id })
    .then(back => {
      return res.status(201).json({ key: back.key });
    })
    .catch(err => {
      console.log('error is: ' + err);
      return res.status(500).json({ message: err.message });
    });
};

exports.getImages = async (req, res) => {
  const post_id = req.query.post_id;

  const { error, urlObjs } = await s3.getPostPresignedUrls(post_id);
  if (error) return res.status(400).json({ message: error.message });

  return res.json(urlObjs);
};

exports.addOrUpdateImageComponent = (req, res) => {
  if (req.body.key === '') {
    res.status(400).send('You must supply an image key');
  }
  // we do this because we use it twice
  const newObj = {
    type: req.body.type,
    key: req.body.key,
    extension: req.body.extension,
    margin_top: req.body.margin_top,
    margin_bottom: req.body.margin_bottom,
    size: req.body.size,
    background_position: req.body.background_position,
  };

  if (!req.body._id) {
    const imageComponent = new ImageComponent({
      ...newObj
    });
    imageComponent.save()
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });

    Post.findById(req.query.post_id)
      .then(post => {
        post.components.splice(req.query.index, 0, imageComponent);
        return post.save();
      })
      .then(saveResponse => {
        res.status(200).send(saveResponse);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  } else {
    ImageComponent.findOneAndUpdate({
      _id: req.body._id
    },
      {
        ...newObj
      }, {
      // without this I think it returns the old one
      new: true
    })
      .then(comp => {
        return Post.updateOne({
          _id: req.query.post_id,
          'components._id': req.body._id
        },
          {
            $set: {
              'components.$': {
                ...comp
              }
            }
          });
      })
      // does not return the updated post
      .then(() => {
        return Post.findById(req.query.post_id);
      })
      .then(post => {
        res.status(200).send(post);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  }
};

exports.deleteImage = async (req, res) => {
  // the component should have already been deleted
  // now we need to delete the image off the s3 bucket
  const key = req.query.key;

  // this is where the magic happens
  const { error, back } = await s3.deleteImage(key);
  if (back) console.log('back: ' + JSON.stringify(back));
  if (error) console.log(error);
};