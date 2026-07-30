const mongoose = require('mongoose')

// connecting to cluster of DB
const connectDB = async () =>{
    
    await mongoose.connect("mongodb+srv://NamasteNodejs:passwordMain@cluster0.q4zmb31.mongodb.net/devTinder")

}

module.exports = { connectDB }



