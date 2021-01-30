const jwt=require('jsonwebtoken')
const user=require('../models/user_model')
module.exports.checkUser=function(req,res,next){
        const token=req.headers.authorization.split(" ")[1]
        const verifiedData=jwt.verify(token,'secretkey')
        // console.log(verifiedData.userId)
        user.findOne({_id:verifiedData.userId})
        .then(function(userData){
            res.send(userData)
        })
        .catch()
}