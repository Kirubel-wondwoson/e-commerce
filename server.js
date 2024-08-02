const express = require('express')
const cors = require('cors')
const connectDB = require('./Config/DB')
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.json({extended: false}))
app.use(cors())

connectDB()

app.use('/user', require('./Routers/UserRouter'))

app.listen(PORT, console.log(`Running on port ${PORT}`))