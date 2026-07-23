const express = require('express')

const app = express()


// This will handle GET call to /user
app.get('/user', (req, res)=>{
    res.send({firstname : "Mahendar Reddy", lastname: "Bommu"})
})

app.post('/user', (req, res)=>{
    res.send("Data successfully saved to database")
})

app.put('/user', (req,res)=>{
    res.send("user data updated to database")
})

app.delete('/user', (req,res)=>{
    res.send("User deleted successfully")
})

app.use('/test', (req, res)=>{
   res.send("Test code from server")
})

app.use('/',(req, res)=>{
    res.send("Main server")
})

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})