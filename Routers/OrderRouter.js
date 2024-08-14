const express = require('express')
const router = express.Router()

const {CreateOrder} = require('../Controller/OrderController')

router.post('/createorder', CreateOrder)

module.exports = router