const { userAuth }= require('../Middlewares/auth.js')
const express = require('express')
const requestRouter = express.Router()

requestRouter.post('/sendConnectionRequest', userAuth , async (req, res)=>{
  console.log("Connection Request received")
  res.send("connection request sent!!")
})


module.exports = requestRouter 