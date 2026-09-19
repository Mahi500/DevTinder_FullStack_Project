const express = require('express')
const userRouter = express.Router()

const { userAuth } = require('../Middlewares/auth.js')
const { ConnectionRequestModel } = require('../models/connectionRequest.js')
const { User } = require('../models/user.js')

// need to show requests received from user which are interested
userRouter.get('/user/requests/received', userAuth, async (req, res)=>{
    try{
          const loggedInUser = req.user
          const requests = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
          }).populate("fromUserId", "firstName lastName photoUrl about skills age gender")
          if(requests.length ==0 ){
            return res.status(404).json({message : "No received requests"})
          }
          res.json({message : "Data fetched successfully", requests})
    }
    catch(error) {
        res.status(400).send("ERROR: " + error.message)
    }
})

userRouter.get('/user/connections', userAuth, async (req, res)=>{
    try{
          const loggedInUser = req.user
          const connections = await ConnectionRequestModel.find({
            $or : [
              {toUserId : loggedInUser._id, status : "accepted"},
              {fromUserId : loggedInUser._id, status : "accepted"}
            ]
          }).populate("fromUserId", "firstName lastName age gender skills about photoUrl")
            .populate("toUserId", "firstName lastName age gender skills about photoUrl")

           const connectionsmust = connections.map((user)=>{
              if(user.fromUserId.equals(loggedInUser._id) ){
                return user.toUserId
              }
              return user.fromUserId
           }) 

          res.json({connectionsmust})

    }
    catch(error){
        res.status(400).send("ERROR :" + error.message)

    }
})

userRouter.get('/user/feed', userAuth, async (req, res)=>{
  try{
       // User should see all the user cards except 
       // 0. his own card
       // 1. his connections
       // 2. ignored people
       // 3. already sent the connnection request
       // 4. already received connection request
       // 5. think about edge cases
       const loggedInUser = req.user
       const page = parseInt(req.query.page) || 1
       let limit = parseInt(req.query.limit) || 2
       limit = limit > 50 ? 50 : limit
       console.log(page)
       // Find all the connection requests (sent + received)
       const connectionRequests = await ConnectionRequestModel.find({
        $or : [
          {fromUserId : loggedInUser._id},
          {toUserId : loggedInUser._id}
        ]
       }).select("fromUserId toUserId")

       const hideConnections = new Set()
       connectionRequests.forEach((connection)=>{
           hideConnections.add(connection.fromUserId.toString())
           hideConnections.add(connection.toUserId.toString())
       })
       console.log(hideConnections)
       const newFeed = await User.find({
       $and : [
        {_id : { $nin : Array.from(hideConnections) }},
        {_id : { $ne : loggedInUser._id} }
        ]
  }).select("firstName lastName about skills photoUrl")
    .skip((page-1)*limit)
    .limit(limit)
       res.json({ newFeed })
  }
  catch(error) {
    res.status(400).json({message : error.message})
  }
})

module.exports = userRouter