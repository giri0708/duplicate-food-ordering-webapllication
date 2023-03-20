const mongoose = require('mongoose');
    
    const userSchema=mongoose.Schema({
        //_id: mongoose.Schema.Types.ObjectId(),
        firstname:{
            type: String,
            required: true,
            maxlength: 100
        },
        lastname:{
            type: String,
            required: true,
            maxlength: 100
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password:{
            type:String,
            required: true,
            minlength:8
        },
    });

module.exports = mongoose.model('User',userSchema);