const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  title: String,
  poem: String,
  explanation: String,
});

const Poem = mongoose.model('poems', PoemSchema);
module.exports = Poem;