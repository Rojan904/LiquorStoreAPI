const express=require('express')
const router=express.Router()
const user=require('../models/userModel')
const {check,validationResult}=require('express-validator') //for validation npm i express-validator --save
const bcryptjs=require('bcryptjs')   //for encryption, done after validation
const jwt=require('jsonwebtoken')   //for token npm i jsonwebtoken --save
// var validator = require("email-validator");
// validator.validate("test@email.com");

const auth = require('../middleware/authenticate')

router.post('/register',[
    check('firstName',"First name is required!").not().isEmpty(),  //empty checking
    check('email',"Invalid Email Address!").isEmail(),     //email check
    check('password',"Password is required!").not().isEmpty(),

],function(req,res){
    const errors=validationResult(req)

    if(errors.isEmpty()){        //if there is no error
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const dob=req.body.dob
    const userName=req.body.username   //body.userName vaneko form bata aauni aile chei postman ko
    const email=req.body.email
    const password=req.body.password
    const userType=req.body.userType

    bcryptjs.hash(password,10,function(err,hash){   //hash varifies that a file/data hasnot altered.
        const u1=new user({firstName:firstName,lastName:lastName,dob:dob,username:userName,email:email,password:hash,userType:userType}) //first ko userName vnya database ko second ko chei mathi variable
        u1.save()
        .then(function(result){ 
            res.status(201).json({
                success:true,
                message:"User registration successful!"})    //showing message in postman/client
        })
        .catch(function(err){
            res.status(500).json({
                success:false,
                message:err})
                console.log(err)
        })
    })
   
    }
    else{

        res.status(400).json(errors.array())   //if there is error send errors
        console.log(errors)
    }
   
})

//login system
router.post('/user/login',function(req,res){
    const userName=req.body.username
    const password=req.body.password   //user provided password
    //we need to find if user exists
    user.findOne({username:userName})    //first ko userName user_model bata aako sec ko variable
    .then(function(userData){
        if(userData===null){
            return res.status(201).json({message : "Invalid username or password!"})
        }
        //username is correct
        bcryptjs.compare(password,userData.password,function(err,result){ //first password is variable and another is db password
            if(result===false){
                return res.status(201).json({message : "Invalid username or password!"})
            }
            // res.send("Correct")
            const token=jwt.sign({userId:userData._id},'secretkey')  //providing token
            res.status(200).json({
                success:true,
                message:"Authorization success",
                token:token,
                userType:userData.userType
            })
            

        })
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })  
})
router.delete('/user/delete/:id',function(req,res){
    const id=req.params.id    //params.id vnya url bata aauni, same to upper
    user.deleteOne({_id:id}).then(function(){
        console.log("deleted")
    })
})

router.put('/user/update/:id',function(req,res){
    const uid=req.params.id;
    const uName=req.body.userName
    user.updateOne({_id:uid,userName:uName}).then(function(){
        console.log("updated")
    })
})

module.exports=router   