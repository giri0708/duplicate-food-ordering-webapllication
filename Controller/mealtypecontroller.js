const MealType=require('../Model/mealtype');

exports.mealtype=(req,res)=>{
    MealType.find().then(result=>{
       res.status(200).json({
           message:"Mealtypes Fetched",
           MealTypes:result
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
};

exports.mealTypeById=(req,res)=>{
  
    let _id = req.params.id;
    MealType.find().then(result=>{
       let mealtype=  result.filter( obj => {
        return obj._id == _id} );
  
       res.status(200).json({
           message:"Restaurant Fetched",
           MealTypes:mealtype
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
  };
