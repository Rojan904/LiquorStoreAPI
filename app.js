const express=require('express')
const app=express()
app.use(express.json())
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))

const db=require('./database/db')
const user_route=require('./route/userRoute')
const productRoute=require('./route/productRoute')
app.use(user_route)
app.use(productRoute)

app.listen(90)