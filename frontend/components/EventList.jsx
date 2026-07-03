import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAllList = async () => {
      try {
        const response = await axios.get(`${api_url}/events`);
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllList();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      <Link
        className="bg-green-600 text-white px-3 py-2 float-end m-2 rounded hover:bg-green-700"
        to="/"
      >
        Back
      </Link>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Total Seats</th>
            <th className="border p-2">Remaining Seats</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{event.name}</td>
              <td className="border p-2">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="border p-2">{event.totalSeats}</td>
              <td className="border p-2">{event.remainingSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
