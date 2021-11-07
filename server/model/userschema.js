const mongoose=require('mongoose');

const workoutSchema = new mongoose.Schema({
        date: {type: Date},
        workoutType:{type:String},
        checkbox:{type:Boolean},
        
})

const schema= new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    phonenumber: {type: String},
    workout: [workoutSchema]
})

const user= mongoose.model('UserDetail', schema);
module.exports= user;