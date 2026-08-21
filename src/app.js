const {connectDB} = require('./config/database.js')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
// middleware which will read JSON object and convert it to JS object
// work for all routes
app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/requests.js')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

connectDB()
  .then(()=>{
        console.log("Database connection estoblished successfully")
        app.listen(7777, ()=>{
          console.log("Server is successfully listening on port 7777")
        })
      })
  .catch ((err)=>{
        console.log("Database connection not estoblished")
      })
    
