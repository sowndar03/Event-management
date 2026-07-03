import { useEffect, useState } from "react";
import axios from "axios";

const ReservationModal = ({ open, onClose }) => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventId: "",
    seats: "",
  });

  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!open) return;

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${api_url}/events`);
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [open]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReserve = async () => {
    try {
      const response = await axios.post(`${api_url}/reservations`, {
        eventId: formData.eventId,
        seats: Number(formData.seats),
      });

      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Reservation failed"); 
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Reserve Seats</h2>

        <select
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          className="border w-full p-2 rounded mb-4 text-black"
        >
          <option value="">Select Event</option>

          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="seats"
          placeholder="Enter Seats"
          value={formData.seats}
          onChange={handleChange}
          className="border w-full p-2 rounded mb-4 text-black"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleReserve}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
