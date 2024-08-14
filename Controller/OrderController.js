const express = require('express')
const Product = require('../Models/ProductModel')
const Order = require('../Models/OrderModel')

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