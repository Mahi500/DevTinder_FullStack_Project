const express = require('express')
const userRouter = express.Router()

const { userAuth } = require('../Middlewares/auth.js')
const { ConnectionRequestModel } = require('../models/connectionRequest.js')

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

module.exports = userRouter