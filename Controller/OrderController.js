const express = require('express')
const Product = require('../Models/ProductModel')
const Order = require('../Models/OrderModel')
const User = require('../Models/UserModel')

exports.CreateOrder = async(req, res) => {
  try {
    // product avaiablity check
    const {userId, totalAmount, orderProducts} = req.body
    for(let element of orderProducts){
      var product = await Product.findById(element.productId)
      if(!product){
        return res.send("Product not found")
      }
      if(element.quantity > product.quantity){
        return res.send(`Only ${product.quantity} ${product.name} avaliable.`)
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
    return res.send("Not authorized")
  }
  try {
    const user = await User.findById(req.user.userId)
    if(!user){
      res.sendStatus(403)
    }
    const order = await Order.find({userId: req.user.userId})
    res.send(order)
  } catch (error) {
    res.send(error)
  }
}

exports.EditOrder = async (req, res) => {
  if(req.user.role !== "Customer"){
    return res.send("Not authorized")
  }
  try {
    const user = await User.findById(req.user.userId)
    const order = await Order.findOne({userId: req.user.userId})
    const orderId = order._id

    if(order.orderStatus !== "Pending"){
      return res.send("Order is Pending, can't edit.")
    }

    const {userId, orderProducts, totalAmount} = req.body

    for(let element of orderProducts){
      var product = await Product.findById(element.productId)
      if(!product){
        return res.send("Product not found")
      }
      if(element.quantity > product.quantity){
        return res.send(`Only ${product.quantity} ${product.name} avaliable.`)
      }
    }
    const orderEdited = await Order.findByIdAndUpdate(
      orderId,
      {userId, orderProducts, totalAmount},
      {new: true}
    )
    res.send(orderEdited)
  } catch (error) {
    res.send(error)
  }
}