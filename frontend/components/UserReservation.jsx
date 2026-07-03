import { useEffect, useState } from "react";
import axios from "axios";

const UserReservation = ({ open, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!open) return;

    const getReservations = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${api_url}/user/reservations`);

        setReservations(response.data.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, [open]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/reservations/${id}`);

      alert("Reservation cancelled successfully.");

      const response = await axios.get(`${api_url}/user/reservations`);
      setReservations(response.data.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to cancel reservation");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">My Reservations</h2>

          <button onClick={onClose} className="text-black text-xl font-bold">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-center text-black">Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-black">No reservations found.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Event</th>
                <th className="border p-2">Seats</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation.id}>
                  <td className="border p-2 text-black">{index + 1}</td>

                  <td className="border p-2 text-black">
                    {reservation.event?.name || "N/A"}
                  </td>

                  <td className="border p-2 text-black">{reservation.seats}</td>

                  <td className="border p-2 text-black">
                    {reservation.status}
                  </td>
                  <td className="border p-2 text-center">
                    {reservation.status === "confirmed" ? (
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-500">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReservation;
