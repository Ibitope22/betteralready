const mongoose=require('mongoose')
const express= require('express');

const Event= require('../model/workout');

const router= express.Router();

/* get the workouts */ 
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* Create new workout */
export const createEvent = async (req, res) => {
    const { title, date } = req.body;

    const newEvent = new Event({ title, date })

    try {
        await newEvent.save();
        res.status(201).json(
            {
                type: "success",
                message: "Event has been added successfully"
            }
        );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* Delete workout */
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`There's no workout with the id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Workout deleted successfully." });
}

export default router;
