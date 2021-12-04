const mongoose=require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    checkbox:{
        type:Boolean,
    }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
