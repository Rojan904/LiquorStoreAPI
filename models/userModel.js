const mongoose=require('mongoose')

const user=mongoose.model('User',{
    firstName:{
        type:String,
        required:true 
    },
    lastName:{
        type:String,
        required:true,
      
    },

    dob:{
        type:Date,
        required:true 
     },
    userName:{
        type:String,
        unique:true,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        uppercase:true
        
    },
    password:{
        type:String,
        unique:true,
        required:true 
    },
    userType:{
        type:String,
        enum:['Admin','Customer'],
        default:'Customer'
    }
    
})

module.exports=user