import express, { Router } from 'express';
import { createEvent, listEvents } from '../controllers/eventController.js';
import { createEventValidator } from '../validator/eventValidator.js';
import { validate } from '../middleware/validationMiddlware.js';
import { deleteSeats, getAllUserRervation, reserveSeats, userReserveration } from '../controllers/reservationController.js';
import { reseverSeatValidator } from '../validator/reserveValidator.js';

export const router = express.Router();

router.post("/api/events", createEventValidator, validate, createEvent);
router.get('/api/events', listEvents);


router.post('/api/reservations', reseverSeatValidator, validate, reserveSeats);
router.delete('/api/reservations/:id', deleteSeats);
router.get('/api/user/reservations', getAllUserRervation);
// router.delete('/api/:id/reservations', userReserveration);