const mongoose = require('mongoose');
const { Post, TextComponent, ImageComponent, Component, Tag } = require('../../db/models/Post.js');
const s3 = require('../s3.js');
const { moveArrayElement } = require('../helpers/moveArrayElement.js');

exports.getAllPosts = (req, res) => {
  Post.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.getPostsInfo = async (req, res) => {
  try {
    // first we need to check if the filters inlcude a tag
    // if it does, we need to retrieve the tag ids for that tag and then use that to filter the posts
    // if it doesn't, we can just use the query as is

    if (req.query.tags) {
      // we need to get the tag ids for the tags in the query
      const tags = req.query.tags.split(',');
      const tagIds = await Tag.find({ name: { $in: tags } }, '_id');
      const tagIdsArr = tagIds.map(tag => tag._id);
      req.query.tag_ids = { $in: tagIdsArr };
      delete req.query.tags;
    }

    let posts = await Post.find({
      ...req.query
    }, '-components');

    // we shouldn't need all this anymore because of image kit
    // the front end doesn't need urls, just the key to render an image

    // const keys = posts.map(post => {
    //   return post.display_image_key;
    // }).filter(key => {
    //   return !!key;
    // })

    // console.log(keys);

    // const { urlObjs } = await s3.getPresignedUrlsFromKeys(keys);

    // posts = posts.map(post => {
    //   post = post.toJSON();
    //   const urlObj = urlObjs.find(u => u.key === post.display_image_key);
    //   if (urlObj !== undefined) {
    //     const url = urlObj.url;
    //     post.url = url;
    //   }
    //   return post;
    // })
    res.status(200).send(posts);

  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

// exports.getPostsInfo = async (req, res) => {
//   const posts = await Post.find({
//     ...req.query
//   }, '-components');

//   const keys = posts.map(post => )

//     .then(data => {
//       console.log(data);
//       // now we have to get the presigned URLs for each of these
//       const keys = data.map(post => {
//         return post.display_image_key;
//       })

//       const urls = s3.



//       res.status(200).send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(400);
//     })
// }

exports.getPost = (req, res) => {
  Post.find({ _id: req.query.post_id })
    .then(data => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.addPost = (req, res) => {
  Post.create({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    tag_ids: req.body.tag_ids,
    created_at: req.body.created_at,
    published: req.body.published,
    published_at: req.body.published_at,
    featured: req.body.featured,
    isDark: req.body.isDark,
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.reorderComponent = (req, res) => {
  const post_id = req.query.post_id;
  const from = req.query.from;
  const to = req.query.to;

  if (!post_id || !from || !to) {
    console.error('You are missing required params');
    return;
  }

  Post.findById(req.query.post_id)
    .then(post => {
      let newComps = [...post.components];
      newComps = moveArrayElement(newComps, from, to);
      post.components = newComps;
      return post.save();
    })
    .then(saveResponse => {
      res.status(200).send(saveResponse);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.addOrUpdateTextComponent = (req, res) => {

  // we define it here because it's used in two places
  const newComp = {
    type: req.body.type,
    text: req.body.text,
    margin_top: req.body.margin_top,
    margin_bottom: req.body.margin_bottom,
  };

  if (!req.body._id) {
    const textComponent = new TextComponent({
      ...newComp
    });
    textComponent.save()
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });

    Post.findById(req.query.post_id)
      .then(post => {
        console.log(textComponent);
        post.components.splice(req.query.index, 0, textComponent);
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
    TextComponent.findOneAndUpdate({
      _id: req.body._id
    },
      {
        ...newComp
      },
      {
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

exports.updatePost = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.query.post_id
  },
    {
      title: req.body.title,
      description: req.body.description,
      tag_ids: req.body.tag_ids,
      display_image_key: req.body.display_image_key,
      display_image_extension: req.body.display_image_extension,
      created_at: req.body.created_at,
      published: req.body.published,
      published_at: req.body.published_at,
      featured: req.body.featured,
      isDark: req.body.isDark,
    },
    {
      // without this I think it returns the old one
      new: true
    })
    .then(post => {
      res.status(200).send(post);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });

};

exports.deletePost = (req, res) => {
  if (!req.query.post_id) {
    res.status(400).send('You need to supply a post_id');
    return;
  }
  s3.emptyS3Directory(req.query.post_id);

  Post.deleteOne({ _id: req.query.post_id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.deleteComponent = (req, res) => {
  console.log('deleting components');
  Component.deleteOne({ _id: req.query.component_id })
    .catch(err => {
      console.log(err);
    });

  Post.findOneAndUpdate(
    {
      _id: req.query.post_id
    },
    {
      $pull: {
        components: {
          _id: req.query.component_id
        }
      }
    },
    {
      new: true
    }
  )
    .then(post => {
      console.log('success??');
      res.status(200).send(post);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};

exports.getRandomPostId = (req, res) => {
  Post.find()
    .then(posts => {
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      res.status(200).send(randomPost._id);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
};