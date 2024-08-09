const express = require('express')
const router = express.Router()

const {CreateAccount, LogIn, EditInfo, ListUsers, DeleteUser, ChangePassword} = require('../Controller/UserController')

router.post('/signup', CreateAccount)
router.post('/login', LogIn)
router.patch('/editinfo/:id', EditInfo)
router.patch('/changepassword/:id', ChangePassword)
router.get('/getuser', ListUsers)
router.delete('/deleteuser/:id',DeleteUser)

module.exports = router