
import { body } from "express-validator";

export const createEventValidator = [
    body("name")
        .notEmpty()
        .withMessage("Event name is required"),

    body("date")
        .notEmpty()
        .withMessage("Event date is required")
        .isISO8601()
        .withMessage("Invalid date format"),

    body("totalSeats")
        .notEmpty()
        .withMessage("Total seats is required")
        .isInt({ min: 1 })
        .withMessage("Total seats must be a positive integer"),
];

