const express = require('express')

const app = express()


// This will handle GET call to /user
// request /user /user/xyz /user/34 /user^^ will work for app.use
// app.get(/a/, (req, res)=>{
//     res.send({firstname : "Mahendar Reddy", lastname: "Bommu"})
// })

// app.get(/.*fly$/, (req, res)=>{
//     res.send({firstname : "Manoj", lastname : "Bommu"})
// })

// app.get('/user', (req, res)=>{
//     console.log(req.query)
//     console.log(req.query.userId, req.query.password)
//     res.send("user data fetched successfully")
// })

app.get('/user/:userId',(req, res)=>{
    console.log(req.params.userId)
    res.send("request params")
})

app.get('/user/:userId/:name/:password', (req, res)=>{
    console.log(req.params.userId, req.params.name, req.params.password)
    res.send("Dynamic request")
})


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})