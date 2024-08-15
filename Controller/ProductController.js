const Product = require('../Models/ProductModel')

exports.GetProducts = async(req, res) => {
  try {
    let products = await Product.find();
    res.send(products)
  } catch (error) {
    res.status(501).send(error)
  }
}
exports.GetSpecificProduct = async(req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(!product){
      return res.status(401).send('Product not found')
    }
    res.send(product)
  } catch (error) {
    res.send(error)
  }
}
exports.AddProduct = async(req, res) => {
  if (req.user.role !== "Admin"){
    return res.status(403).send('Not authorized to add products')
  }
  try {
    const {name,price, productId, category,quantity, brand} = req.body
    const product = await Product.create({name, price, productId, category, quantity,brand})
    res.send(product)
  } catch (error) {
    res.send(error)
  }
}

exports.EditProduct = async(req, res) => {
  if(req.user.role !== "Admin"){
    res.status(403).send("Not authorized to change a product")
  }
  try {
    const {name, price, productId, category,quantity, brand} = req.body
    const editedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {name, price, productId, category, quantity, brand},
      {new: true}
    )
    res.send(editedProduct)
  } catch (error) {
    res.send(err)
  }
}
exports.DeleteProduct = async (req, res) => {
  if(req.user.role !== "Admin"){
    res.status(403).send("Not authorized to delete a product")
  }
  try {
    const product = await Product.findById(req.params.id)
    if(!product){
      return res.status(401).send("Product not found")
    }
    await Product.findByIdAndDelete(req.params.id)
    res.send("Deleted Successfully!!")
  } catch (error) {
    res.send(err)
  }
}