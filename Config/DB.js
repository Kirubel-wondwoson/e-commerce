const mongoose = require('mongoose')
const configer = require('./Keys')
const db = configer.mongoURI

const connectDB = async()=>{
  try {
    await mongoose.connect(db)
    console.log("Succesfully Conneced!!")
  } catch (error) {
    console.log("It's Connected!!")
    process.exit(1)
  }
}
module.exports = connectDB