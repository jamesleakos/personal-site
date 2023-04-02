const mongoose = require('mongoose');
const Poem = require('../../db/models/Poem.js');

exports.getAllPoems = (req, res) => {
  Poem.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};


exports.getOnePoem = (req, res) => {
  console.log('req.query', req.query);
  if (!req.query.poem_id) {
    res.status(400).send('You need to supply a poem_id');
  }

  Poem.findOne({ _id: req.query.poem_id })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.addOrUpdatePoem = (req, res) => {

  // we define it here because it's used in two places
  const newPoem = {
    title: req.body.title,
    poem: req.body.poem,
    explanation: req.body.explanation,
  };

  if (!req.body._id) {
    const poem = new Poem({
      ...newPoem
    });
    poem.save()
      .then(() => {
        return Poem.find({});
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });

  } else {
    Poem.findOneAndUpdate({
      _id: req.body._id
    },
      {
        ...newPoem
      },
      {
        // without this I think it returns the old one
        new: true
      })
      .then(() => {
        return Poem.find({});
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }
};

exports.deletePoem = (req, res) => {
  console.log('poem controller delete');
  if (!req.query.poem_id) {
    res.status(400).send('You need to supply a tag_id');
  }

  Poem.deleteOne({ _id: req.query.poem_id })
    .then(() => {
      return Poem.find({});
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};
