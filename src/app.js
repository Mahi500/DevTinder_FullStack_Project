const express = require('express')

const app = express()

app.use('/users', (req, res, next)=>{
    console.log("Response handler 1")
    res.send("Response 1!!")
    next()
}, (req, res)=>{
    console.log("Response handler 2")
    res.send("Response 2!!")
})


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})