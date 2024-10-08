const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin','Customer','Editor'],
    default: "Customer",
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User