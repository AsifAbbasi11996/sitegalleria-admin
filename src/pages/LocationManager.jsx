import { useEffect, useState } from "react";
import {
  addDestination,
  getDestinations,
  updateDestination,
  deleteDestination,
} from "../api/api";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { CloudUpload } from "lucide-react";

export default function LocationManager() {
  const [name, setName] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    const formData = new FormData();
    formData.append("destinationName", name);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await updateDestination(editId, formData); // multipart update
        setSuccessMsg("Location updated successfully ✅");
      } else {
        await addDestination(formData); // multipart add
        setSuccessMsg("Location added successfully ✅");
      }

      setName("");
      setEditId(null);
      setImage(null);
      setPreview(null);
      fetchDestinations();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error saving destination:", err.message);
    }
  };

  const handleEdit = (destination) => {
  setEditId(destination._id);
  setName(destination.destinationName);
  setPreview(destination.image);
  setImage(null);

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        await deleteDestination(id);
        setSuccessMsg("Location deleted successfully ❌");
        fetchDestinations();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("Error deleting location:", err.message);
      }
    }
  };

  return (
    <div className="md:p-6 p-2 md:py-3 py-1">
      <h1 className="md:text-xl text-lg font-bold mb-4">Manage Locations</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-start justify-center"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-[#e4e4e4] p-2 w-64 rounded"
          placeholder="Location Name"
        />

        <label
          htmlFor="image"
          className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500 group"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full rounded"
            />
          ) : (
            <>
              <CloudUpload size={30} className="text-blue-500 mb-2" />
              <p className="md:text-base text-xs">Upload Image</p>
              <p className="uppercase md:text-[12px] text-[10px] text-center">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <button
          type="submit"
          className="text-sm md:text-base px-4 py-2 bg-blue-600 text-white rounded md:h-12"
        >
          {editId ? "Update Location" : "Add Location"}
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 font-medium mt-4">{successMsg}</p>
      )}

      <ul className="mt-6 flex flex-wrap items-center gap-3">
        {destinations.map((d) => (
          <div
            key={d._id}
            className="p-3 border border-[#e4e4e4] rounded flex flex-col gap-3 w-64 bg-white shadow-sm"
          >
            <img
              src={d.image}
              className="rounded-md object-cover h-40 w-full"
              alt=""
            />
            <p className="font-medium md:text-base text-sm text-center">
              {d.destinationName}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(d)}
                className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer"
              >
                <HiPencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(d._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
