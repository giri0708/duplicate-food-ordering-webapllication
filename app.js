const express=require('express');
app=express();
port=2000;
var cors = require('cors');
app.use(cors());
const mongoose=require('mongoose');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'10mb'}));

mongoose.connect('unusual-lion-tieCyclicDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on("error",console.error.bind(console,"MongoDB Connection Error:"));


var router=require('./route');
app.use('/',router)

app.listen(port,()=>{
    console.log("server is listening to"+ port);
});
