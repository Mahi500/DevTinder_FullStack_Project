const express = require('express')

const app = express()


// This will handle GET call to /user
// request /user /user/xyz /user/34 /user^^ will work for app.use
app.get('/user', (req, res)=>{
    res.send({firstname : "Mahendar Reddy", lastname: "Bommu"})
})


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})