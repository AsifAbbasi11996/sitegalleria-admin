import { useEffect, useState } from "react";
import {
  addDestination,
  getDestinations,
  updateDestination,
  deleteDestination,
} from "../api/api";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

export default function LocationManager() {
  const [name, setName] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDestinations = async () => {
    try {
      const res = await getDestinations();
      setDestinations(res.data);
    } catch (err) {
      console.error("Error fetching destinations:", err.message);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    try {
      if (editId) {
        await updateDestination(editId, { destinationName: name });
        setSuccessMsg("Destination updated successfully ✅");
      } else {
        await addDestination({ destinationName: name });
        setSuccessMsg("Destination added successfully ✅");
      }

      setName("");
      setEditId(null);
      fetchDestinations();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error saving destination:", err.message);
    }
  };

  const handleEdit = (destination) => {
    setEditId(destination._id);
    setName(destination.destinationName);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDestination(id);
        setSuccessMsg("Destination deleted successfully ❌");
        fetchDestinations();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("Error deleting destination:", err.message);
      }
    }
  };

  return (
    <div className="p-6 py-3">
      <h1 className="text-xl font-bold mb-4">Manage Locations</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-64 rounded"
          placeholder="Location Name"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded h-12"
        >
          {editId ? "Update Location" : "Add Location"}
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 font-medium mt-4">{successMsg}</p>
      )}

      <ul className="mt-6 flex flex-wrap items-center gap-3">
        {destinations.map((d) => (
          <li
            key={d._id}
            className="p-3 border rounded flex items-center justify-between gap-3 w-64 bg-white shadow-sm"
          >
            <span className="font-medium">{d.destinationName}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(d)} className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer">
                <HiPencil size={18} />
              </button>
              <button onClick={() => handleDelete(d._id)} className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer">
                <MdDelete size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
