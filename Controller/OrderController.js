const express = require('express')
const Product = require('../Models/ProductModel')
const Order = require('../Models/OrderModel')
const User = require('../Models/UserModel')

exports.CreateOrder = async(req, res) => {
  try {
    // product avaiablity check
    const {userId, totalAmount, orderProducts} = req.body
    for(const element of orderProducts){
      var product = await Product.findById(element.productId)
      if(!product || element.quantity > product.quantity){
        return res.status(401).send("Product not found")
      }
    }

    // order create
    const orderCreated = await Order.create({
      userId,
      totalAmount,
      orderProducts
    })
    for (const element of orderProducts) {
      const productQuantity = product.quantity - element.quantity
      const updateProduct = await Product.findByIdAndUpdate(element.productId, {quantity: productQuantity}, {new: true})
    }
    res.send(orderCreated)
  } catch (error) {
    res.status(501).send(error)
  }
}
exports.GetOrders = async(req, res) => {
  if(req.user.role !== "Admin"){
    return res.send("Not authorized")
  }
  try {
    const orders = await Order.find()
    res.send(orders)
  } catch (error) {
    res.status(501).send(error)
  }
}

exports.GetMyOrder = async(req, res) => {
  if(req.user.role !== "Customer"){
    return res.send("Not authrorized")
  }
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      res.sendStatus(403)
    }
    const order = await Order.find({userId: req.params.id})
    res.send(order)
  } catch (error) {
    res.send(error)
  }
}