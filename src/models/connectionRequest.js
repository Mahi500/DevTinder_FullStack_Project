const mongoose = require('mongoose')
const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        // Allow only these values for status field. Throws an error if anyother value comes.
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : 'value is incorrect status type'
        }
    }
},
{
    timestamps : true
})

connectionRequestSchema.index({ fromUserId : 1, toUserId : 1})

//middleware which executes before saving a connection 
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this
    // check if fromUserId equals to toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
       throw new Error("Cannot send connection request to yourself!")
    }
   // next()
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema)

module.exports = {ConnectionRequestModel}