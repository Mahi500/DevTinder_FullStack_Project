const jwt = require('jsonwebtoken')
const { User } = require('../models/user.js')

const userAuth= async (req, res, next)=>{
    try{
    const cookies = req.cookies
    const { token } = cookies
    if(!token){
        throw new Error("Invalid Token!!!!")
    }
    const decodedId = await jwt.verify(token, 'Tk@5f&W3021')
    const { _id } = decodedId
    console.log(_id)
    const user = await User.findById(_id)
    if(!user){
        throw new Error("User not found")
    }
    req.user = user
    next()
}
catch(err){
    res.status(400).send("Error : " + err)
}
}

module.exports ={userAuth}