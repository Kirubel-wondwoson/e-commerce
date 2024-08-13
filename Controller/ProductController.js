const Product = require('../Models/ProductModel')

exports.GetProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.send(products)
  } catch (error) {
    res.status(501).send(error)
  }
}
exports.AddProduct = async(req, res) => {
  try {
    const {name,price, productId, category, brand} = req.body
    const product = await Product.create({name, price, productId, category, brand})
    res.send(product)
  } catch (error) {
    res.send(err)
  }
}
exports.EditProduct = async(req, res) => {
  try {
    const {name,price, productId, category, brand} = req.body
    const editedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {name, price, productId, category, brand},
      {new: true}
    )
    res.send(editedProduct)
  } catch (error) {
    res.send(err)
  }
}
exports.DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.send("Deleted Successfully!!")
  } catch (error) {
    res.send(err)
  }
}