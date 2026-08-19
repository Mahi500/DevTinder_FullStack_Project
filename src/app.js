const { adminAuth, userAuth }= require('./Middlewares/auth.js')
const {connectDB} = require('./config/database.js')
const { User } = require('./models/user.js')
const express = require('express')
const { validateSignUpData, validateLoginData } = require("./utils/validation.js")
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()
// middleware which will read JSON object and convert it to JS object
// work for all routes
app.use(express.json())
app.use(cookieParser())
app.post('/signUp', async (req, res)=>{
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

app.post('/login', async (req, res)=>{
  try{
  // validation of request body
  validateLoginData(req)
  const {emailId, password} = req.body
  const user = await User.findOne({emailId : emailId })
  if(!user){
    throw new Error("Invalid Credentials")
  }
  const passwordValid = await bcrypt.compare(password, user.password)
    if(passwordValid) {
      // id and secret_key assigned as jwttoken
      const jwttoken = jwt.sign({_id : user._id}, "Tk@5f&W3021")
      res.cookie("token", jwttoken)
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

app.get('/profile', async (req, res)=>{
  try{
    const cookies = req.cookies
    const { token } = cookies
    if(!token){
     throw new Error("Invalid token")
    }
    // it will return _id of the user if jwt token is valid
    // token and secret_key will be given as input
    const tokenValid = jwt.verify(token, "Tk@5f&W3021")
    console.log(tokenValid)
    const { _id } = tokenValid
    const user = await User.findById({_id : _id})
    if(!user){
      throw new Error("user not found")
    }
    res.send(user)
  }
  catch(error){
    res.status(400).send("ERROR : " + error.message)
  }
})

app.get('/users', async (req, res)=>{
     const email = req.body.emailId

  try{
    // users returns an object not array for findOne
    const user = await User.findOne({emailId : email})
    if(!user){
      res.send("Not found any user").status(404)
    }
    else{
      console.log("Found the users with emaild")
      res.send(user)
    }
  }
  catch (err){
      console.log("Something went wrong")
      res.status(400).send("Something went wrong")
  }
})

// API to get all the users info
app.get('/feed',async (req, res)=>{
  try{
       const users = await User.find({})
       if(users.length ===0){
        res.status(404).send("Not found any user")
       }
       else{
        console.log("All the user feed fetched")
        res.send(users)
       }
  }
  catch(err) {
       console.log("User fetch failed. Something went wrong")
       res.status(400).send("Something went Wrong")
  }

})

// API to delete the user by finding the id
app.delete('/user', async (req, res)=>{
    try{
     const userId = req.body.userId
     //const deletedUser = await user.findOneAndDelete({_id: userId})
     const deletedUser = await User.findByIdAndDelete(userId)
     if(!deletedUser){
       console.log("Id not found")
       res.status(404).send("Id not found")
     }
     else{
       console.log("User deleted successfully", deletedUser)
       res.send("User deleted successfully")
     }
    }
    catch(error){
       console.error("Something went wrong")
       res.status(400).send("Something went wrong while deleting user")
     }
})

// API to update a particular field of the user
app.patch('/user/:userId', async (req, res)=>{
  try{
      //const userId = req.body.userId
      const userId = req.params?.userId
      const data = req.body
      const ALLOWED_UPDATES = ["skills", "age", "gender", "about", "photoUrl"]
      const updatedField = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))
      if(!updatedField){
        throw new Error("Update not allowed. Only following fields are allowed for update : " + ALLOWED_UPDATES)
      }
      if(data?.skills?.length > 10){
        throw new Error("skills should be lessthan 10")
      }
      //const updatedUser = await User.findOneAndUpdate({_id: userId}, data)
      const updatedUser = await User.findByIdAndUpdate(userId, data, {returnDocument : 'after', 
        runValidators : true
      })
      //const updatedUser = await User.findOneAndUpdate({emailId : userId}, data)
      if(!updatedUser){
        console.log('User not found to update')
        res.status(404).send("User not found to update")
      }
      else{
        console.log("user updated successfully", updatedUser, data)
        res.send("User updated successfully")
      }
  }
  catch(error){
      console.log("Something went wrong: UPDATE FAILED", error.message)
      res.status(400).send("Something went wrong while updating the user : " + error.message)
  }

})


connectDB()
  .then(()=>{
        console.log("Database connection estoblished successfully")
        app.listen(7777, ()=>{
          console.log("Server is successfully listening on port 7777")
        })
      })
  .catch ((err)=>{
        console.log("Database connection not estoblished")
      })
    
