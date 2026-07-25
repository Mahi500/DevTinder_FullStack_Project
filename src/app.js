const express = require('express')

const app = express()

// GET /users ==> middleware chain ==> request handler

app.use("/", (req, res, next)=>{
    res.send("Handling / route")
    next()
})

app.get("/user", (req, res, next)=>{
    console.log("handling /user route")
    next()
},
(req, res, next)=>{
    res.send("first route handler")
},
(req, res, next)=>{
    res.send("second route handler")
}
)


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})