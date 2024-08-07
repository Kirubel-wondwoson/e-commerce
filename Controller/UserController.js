const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/UserModel')

exports.CreateAccount = async(req, res) => {
  try {
    const {name,phone,password,role,age} = req.body
    const existingUser = await User.findOne({phone: phone})
    if (existingUser){
      return res.send('Phone number already exists')
    }
    const saltRounds = 10; // number of rounds (salt round): indicates how many times the hashing algorithm applied.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user ={name,phone,password:hashedPassword,role,age}

    await User.create(user)
    res.send(user)
  } catch (error) {
    res.send(err)
  }
}
exports.ListUsers = async(req, res) => {
  try {
    let users = await User.find()
    res.send(users)
  } catch (error) {
    res.send(err)
  }
}
exports.LogIn = async(req, res) => {
  try {
    const {phone, password} = req.body
    const user = await User.findOne({phone})
    if (user){
      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch){
        res.send(`Welcome, ${user.name}! You're now logged in.`)
      }else{
        return res.send("Incorrect username or password. Please try again.")  
      }
    } else{
      return res.send("Incorrect username or password. Please try again.")
    }
  } catch (error) {
    res.send(err)
  }
}
exports.EditInfo = async (req, res) => {
  try {
    const {name, phone, role, password, age} = req.body
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      {name, phone, role, password, age},
      {new: true}
    );
    res.send(editUser)
  } catch (error) {
    res.send(err)
  }
}
exports.DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const userToDelete = await User.findById(userId)

    if(!userToDelete){
      return res.status(404).send({msg:'User not found'})
    }
    await User.findByIdAndDelete(userId)
    res.send("User deleted Succesfully!")
  } catch (error) {
    res.send(err)
  }
}