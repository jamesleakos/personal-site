const mongoose = require('mongoose');
const { Tag } = require('../../db/models/Post.js');

exports.getAllTags = (req, res) => {
  Tag.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
};

exports.addOrUpdateTag = (req, res) => {
  if (req.body.name === '') {
    res.status(400).send('Must include a name');
  }

  // we define it here because it's used in two places
  const newTag = {
    name: req.body.name
  }

  if (!req.body._id) {
    const tag = new Tag({
      ...newTag
    })
    tag.save()
      .then(t => {
        res.status(200).send(t);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      })

  } else {
    Tag.findOneAndUpdate({
      _id: req.body._id
    },
    {
      ...newTag
    },
    {
      // without this I think it returns the old one
      new: true
    })
      .then(t => {
        res.status(200).send(t);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      })
  }
}
