const mongoose=require('mongoose');
// mongoose.connect( 'mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });
// mongoose.connect( 'mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// });

// var db=mongoose.connection;

// db.on("error",console.error.bind(console,"MongoDB Connection Error:"));


/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// const filter = {};

// async(client) =>{ await MongoClient.connect(
//   'mongodb://localhost:27017/',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// db=client.db();
// const coll = client.db('Zomato').collection('location');
// const cursor = coll.find(filter);
// const result = await cursor.toArray();
// await client.close()};

const Schema=mongoose.Schema;

const LocationSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    city_id:{
        type:Number,
        required:true,
    },
    location_id:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country_name:{
        type:String,
        required:true,
    },
 });

 module.exports=mongoose.model("Location",LocationSchema,"Location");
