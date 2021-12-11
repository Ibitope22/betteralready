const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    phonenumber: {type: String},
    workout: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'workout',
    }]
})

const user= mongoose.model('UserDetail', userschema);
module.exports= user;