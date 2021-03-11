const mongoose=require('mongoose')

const cart=mongoose.model('Cart',{
    ailaImage:{
        type:String,
        required:true
    },
    ailaPrice:{
        type:Number,
        required:true
    },
    ailaMl:{
        type:Number,
        required:true
    },
    ailaName:{
        type:String,
        required:true
    },
    ailaType:{
        type:String,
        required:true
    },
    ailaQty:{
        type:Number,
        required:true
    }
})
module.exports=cart