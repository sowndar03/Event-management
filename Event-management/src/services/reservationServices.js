import prisma from "../config/prisma.js";
import { AppError } from "../utils/appError.js";

export const store = async (data) => {
  try {
    const userId = "5cff82e1-b43c-498a-a619-8fc1b9267469";
    const reservation = await prisma.$transaction(async (tx) => {
      const eventUpdate = await tx.event.updateMany({
        where: {
          id: data.eventId,
          remainingSeats: {
            gte: data.seats,
          },
        },
        data: {
          remainingSeats: {
            decrement: data.seats,
          },
        },
      });

      if (eventUpdate.count === 0) {
        const event = await tx.event.findUnique({
          where: {
            id: data.eventId,
          },
        });
        if (!event) {
          throw new AppError("Event does not exist", 404);
        }

        throw new AppError("Not enough seats available", 400);
      }

      const reservation = await tx.reservation.create({
        data: {
          userId: userId,
          eventId: data.eventId,
          seats: data.seats,
          status: "confirmed",
        },
      });

      const auditLogs = await tx.auditLog.create({
        data: {
          reservationId: reservation.id,
          action: "created",
        },
      });

      return reservation;
    });

    return reservation;
  } catch (error) {
    throw error;
  }
};

export const deleteReservedSeats = async (id) => {
  try {
    const reservation = await prisma.reservation.findFirst({
      where: {
        id: id,
      },
    });

    if (!reservation) {
      throw new AppError("Reservation not Found", 404);
    }

    const trashUpdate = await prisma.reservation.update({
      where: {
        id: id,
      },
      data: {
        status: "cancelled",
      },
    });

    const seatUpdate = await prisma.event.update({
      where: {
        id: reservation.eventId,
      },
      data: {
        remainingSeats: {
          increment: reservation.seats,
        },
      },
    });

    const auditLogs = await prisma.auditLog.create({
      data: {
        reservationId: reservation.id,
        action: "cancelled",
      },
    });

    return reservation;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const user = await prisma.reservation.findFirst({
      where: {
        userId: id,
      },
      include: {
        event: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const listUser = async () => {
  const reservations = await prisma.reservation.findMany({
    include: {
      event: true,
    },
  });

  return reservations;
};
