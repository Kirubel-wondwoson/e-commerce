const express = require('express')
const router = express.Router()
const authenticateToken = require('../Middleware/authenticateToken')

const {GetProducts, AddProduct, EditProduct, DeleteProduct} = require('../Controller/ProductController')

router.get('/getproducts', authenticateToken, GetProducts)
router.post('/addproduct', authenticateToken, AddProduct)
router.patch('/editproduct/:id', authenticateToken, EditProduct)
router.delete('/deleteproduct/:id', authenticateToken, DeleteProduct)

module.exports = router