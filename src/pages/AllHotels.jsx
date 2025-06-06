import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { deleteHotel, getAllHotels } from "../api/hotelApi";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await getAllHotels();
      setHotels(res.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await deleteHotel(id)
      fetchHotels(); // Refresh list
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const name = hotel.hotelName.toLowerCase();
    const destination = hotel.destination?.destinationName?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      destination.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1 className="md:text-2xl text-xl font-bold md:mb-6 mb-3 text-gray-800">
        All Hotels
      </h1>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search by hotel name or destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white shadow-md rounded overflow-hidden"
            >
              <img
                src={hotel.images?.[0] || "https://via.placeholder.com/300x200"}
                alt="hotel"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.hotelName}</h3>
                <p className="text-sm text-gray-600">{hotel.address}</p>
                <p className="text-sm text-gray-600">
                  Destination: {hotel.destination?.destinationName || "N/A"}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/hotelpage/edit-hotel/${hotel._id}`)
                    }
                    className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md transition"
                  >
                    <HiPencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md transition"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default AllHotels;
