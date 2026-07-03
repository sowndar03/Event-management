import prisma from "../config/prisma.js";
import { AppError } from "../utils/appError.js";

export const createEventService = async (data) => {
  try {
    const totalSeats = Number(data.totalSeats);
    const eventCheck = await prisma.event.findFirst({
      where: {
        name: data.name,
        date: new Date(data.date),
      },
    });

    if (eventCheck) {
      throw new AppError("Event Already Created on that Particular Date", 409);
    }

    const event = await prisma.event.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        totalSeats,
        remainingSeats: totalSeats,
      },
    });
    return event;
  } catch (error) {
    throw error;
  }
};

export const listEvent = async () => {
  const events = await prisma.event.findMany();
  return events;
};
