const mongoose = require('mongoose');

options = { discriminatorKey: 'kind' };
// components are what make up a post
const componentSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  type: String,
  margin_top: Boolean,
  margin_bottom: Boolean
}, options);

const Component = mongoose.model('Component', componentSchema);

// text components are components that render text
const textSchema = new mongoose.Schema({
  text: String
});
const TextComponent = Component.discriminator('TextComponent', textSchema, options);

const imageSchema = new mongoose.Schema({
  key: String,
  extension: String,
  size: String,
  background_position: {
    type: String,
    default: 'center'
  }
});
const ImageComponent = Component.discriminator('ImageComponent', imageSchema, options);

const postSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  // display info
  title: String,
  description: String,
  tag_ids: [mongoose.Schema.Types.ObjectId],
  display_image_key: String,
  display_image_extension: String,
  isDark: {
    type: Boolean,
    default: false
  },

  // other info
  created_at: Date,
  published: Boolean,
  published_at: Date,
  featured: Boolean,
  components: [componentSchema]
});

const Post = mongoose.model('Post', postSchema);

const tagSchema = new mongoose.Schema({
  name: String,
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = {
  Post,
  TextComponent,
  ImageComponent,
  Component,
  Tag
};