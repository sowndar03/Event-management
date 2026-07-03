import { body } from "express-validator";

export const reseverSeatValidator = [
    
    body("eventId")
        .notEmpty()
        .withMessage("Event is required")
        .isUUID(),

    body("seats")
        .notEmpty()
        .withMessage("Seat is required")
        .isInt({ min: 1 })
        .withMessage("Seat must be a Positive Number")
]