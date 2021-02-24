const express=require('express')
const app=express()
app.use(express.json())
const bodyParser=require('body-parser')
const cors=require('cors')   // browser mechanism which enables controlled access to resources located outside of a given domain

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
const db=require('./database/db')
const user_route=require('./route/userRoute')
const productRoute=require('./route/productRoute')
app.use(user_route)
app.use(productRoute)


app.listen(90)