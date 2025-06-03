import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteHotel, getAllHotels } from "../api/hotelApi";
import { Pencil, Trash2 } from "lucide-react";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await getAllHotels();
      setHotels(res.data); // ✅ FIX: access the actual data
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      await deleteHotel(id);
      fetchHotels();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hotels</h1>
        <button
          onClick={() => navigate("/admin/hotels/add")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
                      className="w-10 h-10 object-cover rounded-full border invert"
                    />
                  )}
                  <h2 className="text-xl font-semibold">
                    {hotel.content?.description?.slice(0, 30) ||
                      "No Description"}
                  </h2>
                </div>

                <p className="text-gray-600 text-sm">
                  {hotel.content?.description?.slice(0, 100) ||
                    "No content available"}
                </p>

                <div>
                  <button
                    onClick={() => navigate(`/admin/hotels/edit/${hotel._id}`)}
                    className="mr-5 mt-2 bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="mt-2 bg-red-700 text-white px-4 py-1.5 rounded"
                  >
                    <Trash2 size={18} />
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
