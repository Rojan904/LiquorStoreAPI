const express=require('express')
const router=express.Router()
const product=require('../models/productModel')
const authenticate=require('../middleware/authenticate')   //providing path for authenticate.js
const imageUpload=require('../middleware/imageUpload')

//for inserting liquor items
router.post('/product/insert',imageUpload.single('productImage'),function(req,file,res){
    console.log(req.file)
    const productName=req.body.productName
    const productType=req.body.productType
    const productPrice=req.body.productPrice
    // const productImage=req.body.productImage

    const productData=new product({
        productName:productName,
        productType:productType,
        productPrice:productPrice,
        productImage:req.file.path})
    
    productData.save().then(function(result){
        res.status(201).json({message:"Product Added Successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })

})

router.put('/product/update/:id',authenticate.checkUser,authenticate.checkAdmin,function(req,res){
    const id=req.params.id
    const productName=req.body.productName
    const productType=req.body.productType
    const productPrice=req.body.productPrice
    const productImage=req.body.productImage

    product.updateOne({_id:id},{productName:productName,productType:productType,productPrice:productPrice,productImage:productImage})
    .then(function(result){
        res.status(200).json({message:"Product updated successfully!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
})

router.delete('/product/delete/:productId',function(req,res){
    const pid=req.params.productId
    product.deleteOne({_id:pid})
    .then(function(result){
        res.status(200).json({message:"Product deleted successfully",status:"true"})
    })
    .catch(function(err){
        res.status(500).json({message:err,status:"false"})
    })
})

//Fetch all data from db
router.get('/product/all',function(req,res){
    product.find().then(function(info){
        res.status(200).json(info)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/product/one/:id',function(req,res){
    const id=req.params.id
    product.findOne({_id:id})
    .then(function(info){
        res.status(200).json(info)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

module.exports=router