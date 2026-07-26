const { adminAuth, userAuth }= require('./Middlewares/auth.js')
require('./config/database.js')
const express = require('express')

const app = express()



app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})