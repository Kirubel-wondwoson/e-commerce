const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  orderProducts: [{
    productId:{
      type: String 
    },
    quantity: {
      type: Number
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ["Pending","Approved","Cancelled", "Rejected"],
    default: "Pending"
  }
}, {timestamps: true})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order