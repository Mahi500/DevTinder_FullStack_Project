const { userAuth }= require('./Middlewares/auth.js')
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

app.post('/sendConnectionRequest', userAuth , async (req, res)=>{
  console.log("Connection Request received")
  res.send("connection request sent!!")
})

app.get('/profile', userAuth, async (req, res)=>{
  try{
    const user = req.user
    res.send(user)
  }
  catch(error){
    res.status(400).send("ERROR : " + error.message)
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
    
