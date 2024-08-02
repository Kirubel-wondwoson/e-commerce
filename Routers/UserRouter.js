const express = require('express')
const router = express.Router()

const {CreateAccount, LogIn, EditInfo, ListUsers, DeleteUser} = require('../Controller/UserController')

router.post('/signup', CreateAccount)
router.post('/login', LogIn)
router.post('/editinfo/:id', EditInfo)
router.get('/getuser', ListUsers)
router.delete('/deleteuser/:id',DeleteUser)

module.exports = router