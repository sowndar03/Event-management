import { useState } from "react";
import axios from "axios";

const EventModal = ({ open, onClose }) => {
  const api_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    totalSeats: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${api_url}/events`, formData);
      console.log(response.data);
      alert("Event created successfully!");

      setFormData({
        name: "",
        date: "",
        totalSeats: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl text-black font-semibold mb-4">Add Event</h2>

        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
