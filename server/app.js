const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('welcome to the backend')
})

const port = 3000
app.listen(port, ()=>{
    console.log(`the server is live on port ${port}`)
})