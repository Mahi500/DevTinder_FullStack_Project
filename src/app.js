const { adminAuth, userAuth }= require('./Middlewares/auth.js')
const express = require('express')

const app = express()


app.get('/getUserData', (req, res)=>{
    // Logic of DB call and get user data
    try {
    throw new Error("hgstshjsj")
    res.send("User Data Sent")
    }
    catch(err) {
        res.status(500).send("some error contact support team")
    }
})

app.use('/',(err, req, res, next)=>{
    if(err) {
        res.status(500).send("something went wrong")
    }
})

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})