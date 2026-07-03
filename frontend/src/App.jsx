import { Link } from "react-router-dom";
import { useState } from "react";
import EventModal from "../components/EventModal";
import ReservationModal from "../components/ReservationModal";
import UserReservation from "../components/UserReservation";

const App = () => {
  const [open, setOpen] = useState(false);
  const [reservationModal, setReservationModal] = useState(false);
  const [userReservation, setUserReservation] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        Welcome to the Event Management System!
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>

        <Link
          to="/events"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          View Events
        </Link>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          onClick={() => setReservationModal(true)}
        >
          Reservere Seats
        </button>

        <button
          onClick={() => setUserReservation(true)}
          className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
        >
          All Reservations
        </button>
      </div>

      <ReservationModal
        open={reservationModal}
        onClose={() => setReservationModal(false)}
      />
      <UserReservation
        open={userReservation}
        onClose={() => setUserReservation(false)}
      />
      <EventModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default App;
