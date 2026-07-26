const mongoose = require('mongoose')

// connecting to cluster of DB
const connectDB = async () =>{
    
    await mongoose.connect("mongodb+srv://NamasteNodejs:passwordMain@cluster0.q4zmb31.mongodb.net/devTinder")

}

connectDB()
  .then(()=>{
    console.log("Database connection estoblished successfully")
   })
  .catch((err)=>{
    console.log("Database connection not estoblished. Failed top connect")
   })


