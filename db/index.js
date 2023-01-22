require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.MONGO_CLOUD_ATLAS_USER}:${process.env.MONGO_CLOUD_ATLAS_PASSWORD}@${process.env.MONGO_CLOUD_ATLAS_URL}/${process.env.MONGO_CLOUD_ATLAS_DB}`;

console.log(process.env.MONGO_CLOUD_ATLAS_DB)

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

module.exports = db;