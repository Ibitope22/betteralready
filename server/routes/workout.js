const express= require('express');

const { getEvent, createEvent, deleteEvent } = require('../controllers/workout');

const router = express.Router();

router.get('/get_events', getEvent);
router.post('/add_events', createEvent);
router.delete('/delete_event/:id', deleteEvent);

export default router;