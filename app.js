const express=require('express')
const app=express()
app.use(express.json())
const bodyParser=require('body-parser')
const cors=require('cors')   // browser mechanism which enables controlled access to resources located outside of a given domain
const path = require('path');
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
const db=require('./database/db')
const user_route=require('./route/userRoute')
const ailaRoute=require('./route/ailaRoute')
app.use(user_route)
app.use(ailaRoute)
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(90)