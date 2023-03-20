// const express=require('express');

// const router=express.Router();
const Location=require('../Model/locations');




exports.locationcontroller=(req,res)=>{
  Location.find().then(result=>{
       res.status(200).json({
           message:"Locations Fetched",
           locations:result
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
};

// module.exports=router;