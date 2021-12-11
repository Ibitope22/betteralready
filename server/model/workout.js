const mongoose=require('mongoose');


const goalschema = new mongoose.Schema({
    description: {type: String },
})

const workoutschema = new mongoose.Schema({
    date: {type: Date},
    workoutType:{type:String},
    checkbox:{type:Boolean},
    goals: [{goalschema}]    
})

const workout = mongoose.model('workout', workoutschema);
module.exports = workout;