const mongoose = require('mongoose');

options = { discriminatorKey: 'kind' }
// components are what make up a post
const componentSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  type: String,
}, options)

const Component = mongoose.model('Component', componentSchema);  

// text components are components that render text
const textSchema = new mongoose.Schema({
  text: String
})
const TextComponent = Component.discriminator('TextComponent', textSchema, options);

const imageSchema = new mongoose.Schema({
  key: String,
  extension: String,
})
const ImageComponent = Component.discriminator('ImageComponent', imageSchema, options);

const postSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  // display info
  title: String,
  description: String,
  tags: [String],
  display_image_url: String,

  // other info
  created_at: Date,
  published: Boolean,
  published_at: Date,
  featured: Boolean,
  components: [componentSchema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post,
  TextComponent,
  ImageComponent,
  Component
};