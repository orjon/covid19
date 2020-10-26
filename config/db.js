// mongoDB connection
const mongoose = require('mongoose');

// For MongoURI
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    //Connect to mongoDB
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('MongoDB connected!')
  } catch (error) {
    console.error('error.message')
    //exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB


