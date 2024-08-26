const express = require('express')
const Product = require('../Models/ProductModel')
const Order = require('../Models/OrderModel')
const User = require('../Models/UserModel')

exports.CreateOrder = async (req, res) => {
  try {
    // product avaiablity check
    const { userId, totalAmount, orderProducts } = req.body
    for (let element of orderProducts) {
      var product = await Product.findOne({ producttId: element.productId })
      if (!product) {
        return res.send("Product not found")
      }
      if (element.quantity > product.quantity) {
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
      const updateProduct = await Product.findByIdAndUpdate(element.productId, { quantity: productQuantity }, { new: true })
    }
    res.send(orderCreated)
  } catch (error) {
    res.status(501).send(error)
  }
}
exports.GetOrders = async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.send("Not authorized")
  }
  try {
    const orders = await Order.find()
    res.send(orders)
  } catch (error) {
    res.status(501).send(error)
  }
}

exports.GetMyOrder = async (req, res) => {
  if (req.user.role !== "Customer") {
    return res.send("Not authorized")
  }
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      res.sendStatus(403)
    }
    const order = await Order.find({ userId: req.user.userId })
    res.send(order)
  } catch (error) {
    res.send(error)
  }
}

exports.GetUserOrder = async(req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if(user.role !== ("Admin" || "Editor")){
      return res.send("Not authorized")
    }
    const userOrder = await User.findById(req.params.id)
    if(!userOrder){
      return res.send("User not found")
    }
    const orders = await Order.find({userId: req.params.id})
    res.status(201).send(orders)
  } catch (error) {
    res.status(402).send("Catch error")
  }
}
// exports.EditOrder = async (req, res) => {
//   if (req.user.role !== "Customer") {
//     return res.send("Not authorized")
//   }
//   try {
//     const order = await Order.findOne({ userId: req.user.userId })
//     const orderId = order._id
//     if (order.orderStatus !== "Pending") {
//       return res.send("Order is Pending, can't edit.")
//     }

//     const { orderProducts, totalAmount } = req.body

//     for (let element of orderProducts) {
//       var product = await Product.findById(element.productId)
//       if (!product) {
//         return res.send("Product not found")
//       }
//       if (element.quantity > product.quantity) {
//         return res.send(`Only ${product.quantity} ${product.name} avaliable.`)
//       }
//     }

//     const orderEdited = await Order.findByIdAndUpdate(
//       orderId,
//       { orderProducts, totalAmount },
//       { new: true }
//     )
//     if(!orderEdited){
//       res.send("Order can't be edited")
//     }
//     for (const [element, elementOrignal] of _.zip(orderProducts, order.orderProducts)) {
//       if(!elementOrignal) continue
//       const product = await Product.findById(element.productId)
//       let productChange, productQuantity
//       if (element.quantity < elementOrignal.quantity) {
//         productChange = elementOrignal.quantity - element.quantity
//         productQuantity = product.quantity + productChange
//       } else {
//         productChange = element.quantity - elementOrignal.quantity
//         productQuantity = product.quantity - productChange
//       }
//       await Product.findByIdAndUpdate(element.productId, { quantity: productQuantity }, { new: true })
//     }
//     res.send(orderEdited)
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).send("An error occurred while processing your request.");
//   }
// }

exports.EditOrder = async (req, res) => {
  if (req.user.role !== "Customer") {
    return res.send("Not authorized")
  }
  try {
    const order = await Order.findById(req.params.id)
    const orderId = order._id
    if (!order) return res.send("Order not found")

    if (order.orderStatus !== "Pending") {
      return res.send("Order isn't in Pending, can't edit")
    }

    const { orderProducts, totalAmount } = req.body
    for (element of orderProducts){
      const product = await Product.findById(element.productId)
      if(!product){
        return res.send("Product not found")
      }
      if (product.quantity < element.quantity){
        return res.send(`Only ${product.quantity} ${product.name}are available`)
      }
      const productQuantity = product.quantity - element.quantity
      const updateProduct = await Product.findByIdAndUpdate(element.productId, { quantity: productQuantity }, { new: true })
    }
    const orderEdited = await Order.findByIdAndUpdate(
      orderId,
      { orderProducts, totalAmount },
      { new: true }
    )
    if (!orderEdited) {
      res.send("Order can't be edited")
    }
  } catch (error) {
    res.status(500).send("An error occurred while processing your request.")
  }
}

exports.GetOrdersByStatus = async (req, res) => {
  try {
    if(req.user.role !== "Admin"){
      return res.send("Not authorized")
    }

    const {orderStatus} = req.body
    const orders = await Order.find({orderStatus: orderStatus})
    res.send(orders)
  } catch (error) {
    res.status(403).send("Catch error")
  }
}
