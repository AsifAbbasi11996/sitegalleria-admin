import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteHotel, getAllHotels } from "../api/homehotelApi";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await getAllHotels();
      setHotels(res.data);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this hotel?")) {
        await deleteHotel(id);
        toast.success("Hotel deleted successfully", { duration: 5000 });
        fetchHotels();
      }
    } catch (error) {
      toast.error("Error deleting hotel", { duration: 5000 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl text-xl font-bold">Hotels</h1>
        <button
          onClick={() => navigate("/admin/homepage/hotels/add")}
          className="bg-blue-600 text-white px-6 py-2 md:text-base text-sm rounded hover:bg-blue-700"
        >
          Add Hotel
        </button>
      </div>

      {hotels.length === 0 ? (
        <p className="text-gray-500">No hotels available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                {hotel.bgImage ? (
                  <img
                    src={hotel.bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Background
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  {hotel.content?.logo && (
                    <img
                      src={hotel.content.logo}
                      alt="Logo"
                      className="w-20 h-20 object-contain rounded-full"
                    />
                  )}
                  <h2 className="md:text-base text-sm line-clamp-5">
                    {hotel.content?.description || "No Description"}
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/homepage/hotels/edit/${hotel._id}`)
                    }
                    className="bg-green-100 text-green-500 hover:text-green-700 p-2 rounded-md cursor-pointer"
                  >
                    <HiPencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="bg-red-100 text-red-500 hover:text-red-700 p-2 rounded-md cursor-pointer"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotel;
