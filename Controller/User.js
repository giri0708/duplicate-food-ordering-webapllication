const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../Model/User');


exports.signUp=(req,res,next)=>{
      User.find({email: req.body.email})
      .exec()
      .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'Mail exists'
            });
        }else{

            bcrypt.hash(req.body.password, 10, (err,hashedPass)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user= new User({
                        _id:new mongoose.Types.ObjectId(),
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        email: req.body.email,
                        password:hashedPass
                    });
                    user
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'User Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            });
        }
      });
};

exports.signIn=(req,res,next)=>{
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length<1){
                return res.status(401).json({
                    message:'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:'Auth Failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email:user[0].email,
                        userId:user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:'1h'
                    }
                    );
                    return res.status(200).json({
                        message:'Auth Successful',
                        token:token
                    });
                }
                return res.status(401).json({
                    message:'Auth Failed'
                });
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
        
}

exports.deleteId=(req,res,next)=>{
    User.remove({
        _id:req.params.userId
    })
    .exec()
    .then(result=>{res.status(200).json({
        message:'User Deleted'
    });
})
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

