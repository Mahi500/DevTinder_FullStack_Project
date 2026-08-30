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

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res)=>{
  try{
    // requestId is _id of connection requests
    // toUserId person can only accept or reject the request
    // status should be "interested" in connection requests collection not "ignored" 
    const loggedInUser = req.user
    const {status, requestId} = req.params
    const INCLUDED_STATUS = ["accepted", "rejected"]
    if(!INCLUDED_STATUS.includes(status)){
     return res.status(400).json({message : "Status not valid"})
    }
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id : requestId,
      toUserId : loggedInUser._id,
      status : "interested"
    })
    if(!connectionRequest){
      return res.status(400).json({message : "Connection Request not found"})
    }
    connectionRequest.status = status
    const data = await connectionRequest.save()
    res.json({message : "Connection Request " + status, data})
  }
  catch(error) {
       res.status(400).send("Error:"+ error.message)
  }
})


module.exports = requestRouter 