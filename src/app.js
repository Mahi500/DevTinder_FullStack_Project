const express = require('express')

const app = express()

// Auth Middleware handling all GET, POST call matching with route
app.use('/admin',(req, res, next)=>{
    const token ="xyz"
    const isadminAuthorized = token === "xyz"
    if(!isadminAuthorized){
        res.status(401).send("Unathorized request")
    }
    else{
        next()
    }
})

app.get('/user', (req, res)=>{
    res.send("User data fetched")
})

app.get('/admin/getAllData', (req, res)=>{

        res.send("All Data sent")

})

app.get('/admin/deleteUser', (req, res)=>{
    
        res.send("User deleted")
})


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})