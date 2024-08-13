const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middleware/authenticateToken')
const  authenticateTokenRole = require('../Middleware/authenticateTokenRole')
const {CreateAccount, LogIn, EditInfo, ListUsers, DeleteUser, ChangePassword, UserProfile} = require('../Controller/UserController')

router.post('/signup', CreateAccount)
router.post('/login', LogIn)
router.patch('/editinfo/:id',authenticateToken ,EditInfo)
router.patch('/changepassword/:id',authenticateToken, ChangePassword)
router.get('/getuser', ListUsers)
router.get('/userprofile/:id',authenticateToken, UserProfile)
router.delete('/deleteuser/:id',authenticateToken, DeleteUser)

module.exports = router