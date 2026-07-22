const express = require('express')

const app = express()

app.use('/test', (req, res)=>{
   res.send("Test code from server")
})

app.use('/hello', (req, res)=>{
   res.send("Hello hello hello!")
})

// app.use((req, res)=>{
//     res.send("Hello from server")
// })

app.use('/dashboard', (req, res)=>{
    res.send("Dashboard")
})

app.use('/',(req, res)=>{
    res.send("Main server")
})

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777")
})