const mongoose = require('mongoose');
const User = require('./User.js');
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  pageVisited: {
    type: String,
    required: false
  },
  path: {
    type: String,
    required: false
  },
  ip: {
    type: String,
    required: false
  },
});

const Visit = mongoose.model('visits', VisitSchema);
module.exports = Visit;
