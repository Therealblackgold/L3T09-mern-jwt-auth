// This file handles connecting to mongoDB database
// Using local mongoDB database switch LOCAL_MONGO_URI string in .env file for live database
const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_URI);
    console.log("Connection to database successful ⭐️");
  } catch (error) {
    console.log("MongoDB connection: failed 😞️");
    console.log(error);
  }
}

module.exports = connectToDb;
