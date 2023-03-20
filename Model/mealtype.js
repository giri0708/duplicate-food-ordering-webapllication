const mongoose=require('mongoose');

// mongoose.connect( 'mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

// var db=mongoose.connection;

// db.on("error",console.error.bind(console,"MongoDB Connection Error:"));

const Schema=mongoose.Schema;

const MealTypeSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    meal_type:{
        type:Number,
        required:true

    }
 });

 module.exports=mongoose.model("MealType",MealTypeSchema,"MealType");