import {
  deleteReservedSeats,
  getUser,
  listUser,
  store,
} from "../services/reservationServices.js";

export const reserveSeats = async (req, res) => {
  try {
    const reserveSeats = await store(req.body);
    res.status(201).json({ message: "Seats reserved Successfully!" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const deleteSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSeats = await deleteReservedSeats(id);
    res.status(200).json({ message: "Seats Cancelled Successfully" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const userReserveration = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await getUser(id);

    return res.status(200).json({
      event: reservation.event.name,
      seats: reservation.seats,
      status: reservation.status,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

export const getAllUserRervation = async (req, res) => {
  try {
    const reservations = await listUser();
    return res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};
