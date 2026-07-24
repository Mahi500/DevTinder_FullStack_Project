const express = require('express')

const app = express()

app.use('/users', [(req, res, next)=>{
    console.log("Response handler 1")
    //res.send("Response 1!!")
    next()
}, (req, res, next)=>{
    console.log("Response handler 2")
    //res.send("Response 2!!")
    next()
}, (req, res, next)=>{
    console.log("Response handler 3")
    //res.send("Response 3!!")
    next()
}, (req, res, next)=>{
    console.log("Response handler 4")
    //res.send("Response 4!!")
    next()
}, (req, res, next)=>{
    console.log("Response handler 5")
    res.send("Response 5!!")
    //next()
}]
)


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})