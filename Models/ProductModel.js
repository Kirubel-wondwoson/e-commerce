const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  productId:{
    type: String,
    required: true
  },
  category:{
    type: String,
    enum: ["electronics","clothing","book", "other"],
    required: false
  },
  quantity:{
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: false
  }
}, {timestamps: true})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product