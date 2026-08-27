const { userAuth }= require('../Middlewares/auth.js')
const express = require('express')
const requestRouter = express.Router()
const { ConnectionRequestModel } = require('../models/connectionRequest.js')
const { User } = require('../models/user.js')

requestRouter.post('/request/send/:status/:toUserId', userAuth , async (req, res)=>{
 try{
  const fromUserId = req.user._id
  const toUserId = req.params.toUserId
  const status = req.params.status

  if(status !== 'interested' && status !== 'ignored'){
      return res
      .status(400)
      .json({
            message : "Error : Invalid status type :" + status
      })
  }
  const existingConnectionRequest = await ConnectionRequestModel.findOne({
    $or : [
      {fromUserId , toUserId},
      {fromUserId : toUserId, toUserId : fromUserId}
    ]
  })
  if(existingConnectionRequest){
    return res.status(400).json({
      message : "Connection request already exists"
    })

  }
  const toUserIdPresent = await User.findById(toUserId)
  if(!toUserIdPresent){
     return res
            .status(404)
            .json({
              message : "Error :Userid not found"
            })
  }
  const connectionRequest = new ConnectionRequestModel(
   { fromUserId : fromUserId,
     toUserId : toUserId,
     status : status
   }
  )
  const data = await connectionRequest.save()

  res.json({
    message : "Connection Request Sent Successfully",
    data
  })

 }
 catch(error) {
   res.status(400).send("ERROR: " + error.message)
 }
  
})


module.exports = requestRouter 