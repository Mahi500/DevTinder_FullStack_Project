const { userAuth }= require('../Middlewares/auth.js')
const {validateProfileUpdateData} = require('../utils/validation.js')
const express = require('express')
const profileRouter = express.Router()


profileRouter.get('/profile/view', userAuth, async (req, res)=>{
  try{
    const user = req.user
    res.send(user)
  }
  catch(error){
    res.status(400).send("ERROR : " + error.message)
  }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res)=>{
  try{
    if(!validateProfileUpdateData(req)){
      throw new Error("Profile Edit not allowed for requested fields : Invlaid Edit Request")
    }
    const loggedInUser = req.user
    Object.keys(req.body).forEach((field)=>{
      loggedInUser[field] = req.body[field]
    })
    await loggedInUser.save()
    //res.send(loggedInUser)
    res.json({
      message: "User profile updated successfully",
      UpdatedUser : loggedInUser
    })
  }
  catch(error){
    res.status(400).send("Error : " + error)
  }
})


module.exports = profileRouter 