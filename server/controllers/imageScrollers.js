const { Post, ImageScrollerComponent, ImageComponent } = require('../../db/models/Post.js');
const s3 = require('../s3.js');

exports.uploadImageForScroller = (req, res) => {
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
      return res.status(500).json({ message: err.message });
    });
};

// we don't need this because the one in images.js works with images for scrollers as well
// exports.getImages

exports.addOrUpdateImageScrollerComponent = (req, res) => {
  console.log('add or update');
  const newObj = {
    type: req.body.type,
    keys: req.body.keys,
    size: req.body.size,
    margin_top: req.body.margin_top,
    margin_bottom: req.body.margin_bottom,
  };

  if (!req.body._id) {
    console.log('no id');
    const imageScrollerComponent = new ImageScrollerComponent({
      ...newObj
    });

    imageScrollerComponent.save()
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
    console.log('req.query: ', req.query);
    Post.findById(req.query.post_id)
      .then(post => {
        post.components.splice(req.query.index, 0, imageScrollerComponent);
        return post.save();
      })
      .then(saveResponse => {
        return res.status(201).send(saveResponse);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).send(err);
      });

  } else {
    console.log('yes id');
    ImageScrollerComponent.findOneAndUpdate({
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

exports.deleteImages = (req, res) => {
  // the component should already have been deleted
  // now we need to delete the images off the s3 bucket
  console.log('\nQuery: ', req.query.keys, '\n');
  // split the keys into an array, instead of the comma separated string
  const keys = req.query.keys.split(',');

  // this is where the magic happens
  for (let i = 0; i < keys.length; i++) {
    s3.deleteImage(keys[i])
      .then(back => {
        console.log('back: ' + JSON.stringify(back));
      })
      .catch(err => {
        console.log('error is: ' + err);
      });
  }
};

exports.convertImageToImageScroller = async (req, res) => {
  const newObj = {
    type: req.body.type,
    key: req.body.key,
    size: req.body.size,
    margin_top: req.body.margin_top,
    margin_bottom: req.body.margin_bottom,
  };

  if (newObj.type !== 'ImageComponent') {
    return res.status(400).send({ message: 'Invalid component type, expected ImageComponent' });
  }

  let newComponent = new ImageScrollerComponent({
    keys: [newObj.key],
    size: newObj.size,
    margin_top: newObj.margin_top,
    margin_bottom: newObj.margin_bottom,
  });

  try {
    const savedComponent = await newComponent.save();
    res.status(200).send(savedComponent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.convertImageScrollerToImage = async (req, res) => {
  const newObj = {
    type: req.body.type,
    keys: req.body.keys,
    size: req.body.size,
    margin_top: req.body.margin_top,
    margin_bottom: req.body.margin_bottom,
  };

  if (newObj.type !== 'ImageScrollerComponent') {
    return res.status(400).send({ message: 'Invalid component type, expected ImageScrollerComponent' });
  }

  const key = newObj.keys[0];

  let newComponent = new ImageComponent({
    key,
    size: newObj.size,
    background_position: 'center',
    margin_top: newObj.margin_top,
    margin_bottom: newObj.margin_bottom,
  });

  try {
    const savedComponent = await newComponent.save();
    res.status(200).send(savedComponent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// just use addOrUpdateImageScrollerComponent
// exports.updateImageScrollerOrder

