const mongoose=require('mongoose')

const cart=mongoose.model('Cart',{
    ailaImage:{
        type:String,
        
    },
    ailaPrice:{
        type:Number,
        required:true
    },
    ailaMl:{
        type:String,
        required:true
    },
    ailaName:{
        type:String,
        required:true
    },
   
    ailaQty:{
        type:Number,
       
    }
})
module.exports=cart