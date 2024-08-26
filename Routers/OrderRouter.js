const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middleware/authenticateToken')
const {CreateOrder, GetOrders, GetMyOrder, EditOrder, GetUserOrder, GetOrdersByStatus} = require('../Controller/OrderController')

router.post('/createorder', authenticateToken, CreateOrder)
router.get('/getorders',authenticateToken, GetOrders)
router.get('/getmyorder', authenticateToken, GetMyOrder)
router.get('/getuserorder/:id', authenticateToken, GetUserOrder)
router.get('/getorderbystatus', authenticateToken, GetOrdersByStatus)
router.patch('/editorder/:id',authenticateToken, EditOrder)

module.exports = router