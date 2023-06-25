require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.MONGO_CLOUD_ATLAS_USER}:${process.env.MONGO_CLOUD_ATLAS_PASSWORD}@${process.env.MONGO_CLOUD_ATLAS_URL}/${process.env.MONGO_CLOUD_ATLAS_DB}`;

console.log(process.env.MONGO_CLOUD_ATLAS_DB);

// connect to cloud atlas
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

// connect to local db
// const localURL = process.env.LOCAL_MONGO_URL;
// const db = mongoose.connect(localURL, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

module.exports = db;