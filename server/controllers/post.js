const mongoose = require('mongoose');
const { Post, TextComponent, ImageComponent, Component } = require('../../db/models/Post.js');
const s3 = require('../s3.js');

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

exports.getPostsInfo = async (req, res) => {
  try {
    let posts = await Post.find({
      ...req.query
    }, '-components');
    
    const keys = posts.map(post => {
      return post.display_image_key;
    })
  
    const { urlObjs } = await s3.getPresignedUrlsFromKeys(keys);

    posts = posts.map(post => {
      post = post.toJSON();
      const urlObj = urlObjs.find(u => u.key === post.display_image_key);
      if (urlObj !== undefined) {
        const url = urlObj.url;
        post.url = url;
      }
      return post;
    })
    res.status(200).send(posts);

  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

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
  Post.find({_id: req.query.post_id})
    .then(data => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}

exports.addPost = (req, res) => {
  Post.create({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
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

exports.addOrUpdateTextComponent = (req, res) => {
  if (req.body.text === '') {
    res.status(400).send('You cannot add blank text');
  }

  if (!req.body._id) {
    const textComponent = new TextComponent({
      type: req.body.type,
      text: req.body.text
    })
    textComponent.save()
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      })

    Post.findById(req.query.post_id)
      .then(post => {
        post.components.push(textComponent);
        return post.save()
      })
      .then(saveResponse => {
        res.status(200).send(saveResponse);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      })
  } else {
    TextComponent.findOneAndUpdate({
      _id: req.body._id
    },
    {
      type: req.body.type,
      text: req.body.text
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
        })
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
      })
  }
}

exports.updatePost = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.query.post_id
  },
  {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    display_image_key: req.body.display_image_key,
    display_image_extension: req.body.display_image_extension,
    created_at: req.body.created_at,
    published: req.body.published,
    published_at: req.body.published_at,
    featured: req.body.featured,
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
    })

}

exports.deletePost = (req, res) => {
  if (!req.query.post_id) {
    res.status(400).send('You need to supply a post_id');
  }
  s3.emptyS3Directory(req.query.post_id);

  Post.deleteOne({ _id: req.query.post_id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}

exports.deleteComponent = (req, res) => {
  Component.deleteOne({ _id: req.query.component_id })
    .catch(err => {
      console.log(err);
    })

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
      res.status(200).send(post);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}