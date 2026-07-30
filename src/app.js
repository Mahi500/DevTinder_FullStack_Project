const { adminAuth, userAuth }= require('./Middlewares/auth.js')
const {connectDB} = require('./config/database.js')
const { User } = require('./models/user.js')
const express = require('express')

const app = express()
// middleware which will read JSON object and convert it to JS object
// work for all routes
app.use(express.json())

app.post('/signUp', async (req, res)=>{
    try {
       // creating new instance of User model
       // creating a new user with request body from API
       const user = new User(req.body)
       await user.save()
       console.log("User is successfully saved to database")
       res.send("User saved to the database successfully")
    }
    catch(error) {
       console.log("User not saved. Something went wrong", error)
       res.send("User not saved. Something went wrong")
    }
    

})

app.get('/users', async (req, res)=>{
     const email = req.body.emailId

  try{
    // users returns an object not array for findOne
    const user = await User.findOne({emailId : email})
    if(!user){
      res.send("Not found any user").status(404)
    }
    else{
      console.log("Found the users with emaild")
      res.send(users)
    }

  }
  catch (err){
      console.log("Something went wrong")
      res.status(500).send("Something went wrong")
  }
})

app.get('/feed',async (req, res)=>{
  try{
       const users = await User.find({})
       if(users.length ===0){
        res.status(404).send("Not found any user")
       }
       else{
        console.log("All the user feed fetched")
        res.send(users)
       }
  }
  catch(err) {
       console.log("User fetch failed. Something went wrong")
       res.status(500).send("Something went Wrong")
  }

})


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
    
