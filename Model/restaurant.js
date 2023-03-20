const mongoose=require('mongoose');

// mongoose.connect( 'mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

// var db=mongoose.connection;

// db.on("error",console.error.bind(console,"MongoDB Connection Error:"));

const Schema=mongoose.Schema;

const RestaurantSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    location_id:{
        type:Number,
        required:true,
    },
    city_id:{
        type:Number,
        required:true,
    },
    locality:{
        type:String,
        required:true,
    },
    thumb:[{type:String,
            required:true},
            {type:String,
                required:true},
                {type:String,
                    required:true},
                    {type:String,
                        required:true}],
    aggregate_rating:{type:Number,
                    required:true,},
                    rating_text:{type:String,
                        required:true,},
                        min_price:{type:Number,
                            required:true,},
                            contact_number:{type:Number,
                                required:true},
    cuisine:[{id:{
        type:Number,
        required:true},
        name:{type:String,
            required:true,}}],
     image:{type:String,required:true},
     mealtype_id:{type:Number,
     required:true}
 });

 module.exports=mongoose.model("Restaurant",RestaurantSchema,"Restaurant");