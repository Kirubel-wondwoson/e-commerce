const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../Models/UserModel')

exports.CreateAccount = async (req, res) => {
  try {
    const { name, phone, password, role, age } = req.body
    const existingUser = await User.findOne({ phone: phone })
    if (existingUser) {
      return res.status(501).send('Phone number already exists')
    }
    // const saltRounds = bcrypt.genSalt(10)
    const saltRounds = 10; // number of rounds (salt round): indicates how many times the hashing algorithm applied.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = { name, phone, password: hashedPassword, role, age }

    await User.create(user)
    res.send(user)
  } catch (error) {
    res.status(401).send(err)
  }
}
exports.ListUsers = async (req, res) => {
  try {
    let users = await User.find()
    res.send(users)
  } catch (error) {
    res.status(501).send(err)
  }
}

// get specific user by id
exports.UserProfile = async (req,res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(501).send(error)
  }
}
exports.LogIn = async (req, res) => {
  try {
    const { phone, password } = req.body
    const user = await User.findOne({ phone })
    if (!user) {
      return res.send("Incorrect username or password. Please try again.")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const tempuser = {name: user.name, role:user.role, userId: user._id}
      const accessToken = jwt.sign(tempuser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
      return res.json({ message: `Welcome, ${user.name}!`, accessToken });
    } else {
      return res.status(401).send("Incorrect username or password. Please try again.")
    }

  } catch (error) {
    res.send(error)
  }
}
exports.EditInfo = async (req, res) => {
  try {
    const { name, phone, role, age } = req.body
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, role, age },
      { new: true }
    );
    res.status(200).send(editUser)
  } catch (error) {
    res.send(err)
  }
}

// Change Password

exports.ChangePassword = async (req, res) => {
  try {
    const userId = req.params.id
    const {OldPassword, NewPassword} = req.body

    const userToChange = await User.findById(userId)
    if(!userToChange) {
      return res.status(404).send("User not found.")
    }
    const isMatch = await bcrypt.compare(OldPassword, userToChange.password)
    if(!isMatch){
      return res.status(401).send("Incorrect old password. please try again.")
    }
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(NewPassword, saltRounds);

    userToChange.password = hashedPassword
    await userToChange.save()
    res.status(200).send("Password changed sucessfully!!")
  } catch (error) {
    res.send(err)
  }
}

// Role based Delete user
exports.DeleteUser = async (req, res) => {
  try {
    // (1) The User to be deleted
    const userId = req.params.id
    const userToDelete = await User.findById(userId)

    if (!userToDelete) {
      return res.status(404).send({ msg: 'User not found' })
    }

    // (2) The User Logged In (requests)
    if (req.user.role !== "Admin" && userToDelete.phone !== req.user.phone) {
      return res.sendStatus(403)
    }

    await User.findByIdAndDelete(userId)
    res.send("User deleted Succesfully!")
  } catch (error) {
    res.send(error)
  }
}