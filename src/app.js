const { adminAuth, userAuth }= require('./Middlewares/auth.js')
const express = require('express')

const app = express()

// Auth Middleware handling all GET, POST call matching with route
app.use('/admin', adminAuth)
//app.use('/user', userAuth)

app.get('/user/AllData', userAuth, (req, res)=>{
    res.send("User data fetched")
})

app.post('user/login', (req,res)=>{
    res.send("user logged in successfully")
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