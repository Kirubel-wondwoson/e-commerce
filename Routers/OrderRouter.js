const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middleware/authenticateToken')
const {CreateOrder, GetOrders, GetMyOrder, EditOrder} = require('../Controller/OrderController')

router.post('/createorder', authenticateToken, CreateOrder)
router.get('/getorders',authenticateToken, GetOrders)
router.get('/getmyorder', authenticateToken, GetMyOrder)
router.patch('/editorder',authenticateToken, EditOrder)

module.exports = router