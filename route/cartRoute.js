const express=require('express')
const router=express.Router()
const cart=require('../models/cartModel')
const imageUpload=require('../middleware/imageUpload')

router.post('/add/cart',imageUpload.single('ailaImage'),function(req,res){
  
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const ailaName=req.body.ailaName
    // const ailaType=req.body.ailaType
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
    const ailaQty=req.body.ailaQty

    const cartData=new cart({
        ailaImage:req.file.path,
        ailaPrice:ailaPrice,
        ailaMl:ailaMl,
        ailaName:ailaName,
        // ailaType:ailaType,
        ailaQty:ailaQty})
    
    cartData.save().then(function(result){
        res.status(201).json({success:true,message:"Added to Cart Successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
        console.log(e)
    })
    
})

router.get('/cart/all',function(req,res){
    cart.find().then(function(info){
        res.status(200).json({

            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
module.exports=router
