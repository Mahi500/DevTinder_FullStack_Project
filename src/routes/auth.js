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

module.exports = { authRouter }