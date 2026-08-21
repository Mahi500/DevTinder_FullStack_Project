const { User } = require('../models/user.js')
const { validateSignUpData, validateLoginData } = require("../utils/validation.js")
const bcrypt = require('bcrypt')
const express = require('express')
const authRouter = express.Router()

authRouter.post('/signUp', async (req, res)=>{
    try {
       // validation of data
       validateSignUpData(req)
       // encryption of password using bcrypt
       const passwordHash = await bcrypt.hash(req.body.password, 10)
       // creating new instance of User model
       // creating a new user with request body from API
       const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        emailId : req.body.emailId,
        password : passwordHash
       })
       await user.save()
       console.log("User is successfully saved to database")
       res.send("User saved to the database successfully")
    }
    catch(error) {
       console.log("User not saved. Something went wrong", error)
       res.send("User not saved. Error: " + error.message)
    }
})

authRouter.post('/login', async (req, res)=>{
  try{
  // validation of request body
  validateLoginData(req)
  const {emailId, password} = req.body
  const user = await User.findOne({emailId : emailId })
  if(!user){
    throw new Error("Invalid Credentials")
  }
  const passwordValid = await user.validatePassword(password)
    if(passwordValid) {
      // id and secret_key assigned as jwttoken and we can declare expiry time in seconds
      // current user
      const jwttoken = await user.getJWT()
      // 8 hrs we are setting for cookie expiry / millisecs
      res.cookie("token", jwttoken, { expires : new Date(Date.now()+ 1 * 36000)})
      res.send("Login Successful!!!")
    }
    else{
      throw new Error("Invalid Credentials")
    }
  }
  catch(error) {
    res.status(400).send("Error :" + error.message)
  }
})

authRouter.post('/logout', async (req, res)=>{
  res.cookie("token", null , {expires : new Date(Date.now())}).send("User logged out successfully!!")
  // res.send("User logged out successfully!!")
})

module.exports = authRouter 