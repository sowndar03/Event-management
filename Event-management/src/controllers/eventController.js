import { createEventService, listEvent } from "../services/eventService.js"
import { DisplayDateFormat } from "../utils/Helper.js";

export const createEvent = async (req, res) => {
    try {
        const event = await createEventService(req.body);
        return res.status(201).json({
            id: event.id,
            name: event.name,
            remainingSeats: event.remainingSeats,
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
}

export const listEvents = async (req, res) => {
    try {
        const events = await listEvent();

        const datas = events.map(event => ({
            id: event.id,
            name: event.name,
            date: DisplayDateFormat(event.date),
            remainingSeats: event.remainingSeats,
            totalSeats: event.totalSeats,
        }));

        return res.status(200).json(datas)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}