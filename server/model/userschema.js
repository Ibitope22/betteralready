const mongoose=require('mongoose');

const workoutTypeSchema = new mongoose.Schema({

})

const workoutSchema = new mongoose.Schema({
        date: {type: Date,
                required:true,},
        workoutType:[workoutTypeSchema],
        checkbox:{type:Boolean},
        
})

const schema= new mongoose.Schema({
    username: {type: String,
                required:true},
    email: {type: String,
            required:true,},
    password: {type: String,
                required:true,},
    phonenumber: {type: String,
                    required:true,},
    workout: [workoutSchema]
})

const user= mongoose.model('UserDetail', schema);
module.exports= user;