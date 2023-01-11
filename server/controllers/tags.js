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
    return;
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
      .then(() => {
        return Tag.find({});
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
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
      .then(() => {
        return Tag.find({});
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  }
}

exports.deleteTag = (req, res) => {
  if (!req.query.tag_id) {
    res.status(400).send('You need to supply a tag_id');
  }

  Tag.deleteOne({ _id: req.query.tag_id })
    .then(() => {
      return Tag.find({});
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}
