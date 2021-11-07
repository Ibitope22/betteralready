const mongoose=require('mongoose');

const schema= new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phonenumber: String
})

const user= mongoose.model('UserDetail', schema);
module.exports= user;