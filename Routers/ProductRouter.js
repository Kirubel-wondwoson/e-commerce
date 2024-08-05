const express = require('express')
const router = express.Router()

const {GetProducts, AddProduct, EditProduct, DeleteProduct} = require('../Controller/ProductController')

router.get('/getproducts', GetProducts)
router.post('/addproduct', AddProduct)
router.patch('/editproduct/:id', EditProduct)
router.delete('/deleteproduct/:id', DeleteProduct)

module.exports = router