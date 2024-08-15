const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middleware/authenticateToken')
const {CreateOrder, GetOrders, GetMyOrder} = require('../Controller/OrderController')

router.post('/createorder', CreateOrder)
router.get('/getorders',authenticateToken, GetOrders)
router.get('/getmyorder/:id', authenticateToken, GetMyOrder)


module.exports = router