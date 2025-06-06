import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { MdClose, MdDelete } from "react-icons/md";

const AddNewHotel = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    pricePerNight: "",
    taxRate: "",
    latitude: "",
    longitude: "",
    destination: "",
    rating: "",
    descriptionParagraphs: [""],
    activities: [""],
    services: [""],
    paymentMethods: [""],
    safetyAndSecurity: [""],
    staffLanguages: [""],
    general: [""],
    checkInOut: [""],
    advantages: [""],
  });

  const [images, setImages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch destination list
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/home/location");
        setDestinations(res.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const handleChange = (e, field, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const triggerImageUpload = () => {
    document.getElementById("imageUploadInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => data.append(key, v));
      } else {
        data.append(key, value);
      }
    });

    images.forEach((img) => data.append("images", img));

    try {
      await axios.post("http://localhost:4000/api/hotels/add", data);
      alert("Hotel created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating hotel");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-8"
    >
      <h2 className="text-3xl font-bold text-center">Create New Hotel</h2>

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "hotelName",
          "address",
          "pricePerNight",
          "taxRate",
          "latitude",
          "longitude",
          "rating",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border border-[#e2e2e2] outline-0 p-2 w-full mb-2 rounded"
            />
          </div>
        ))}

        {/* Destination Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="border border-[#e2e2e2] outline-0 p-2 w-full mb-2 rounded"
          >
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option key={d._id} value={d._id}>
                {d.destinationName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Paragraphs as textarea */}
      <div className="space-y-2">
        <label className="font-semibold block">Description Paragraphs:</label>
        {formData.descriptionParagraphs.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-start mb-2">
            <textarea
              value={item}
              onChange={(e) => handleChange(e, "descriptionParagraphs", idx)}
              className="border border-[#e2e2e2] outline-0 p-2 w-full rounded"
              placeholder={`Enter paragraph ${idx + 1}`}
              rows={3}
            />
            {formData.descriptionParagraphs.length > 1 && (
              <button
                type="button"
                onClick={() => removeField("descriptionParagraphs", idx)}
                className="text-red-500 bg-red-100 font-bold p-2 rounded-md"
              >
                <MdDelete/>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("descriptionParagraphs")}
          className="text-blue-600 text-sm border border-blue-600 p-2 rounded-md mt-2"
        >
          + Add Paragraph
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Other Array Fields */}
        {[
          "activities",
          "services",
          "paymentMethods",
          "safetyAndSecurity",
          "staffLanguages",
          "general",
          "checkInOut",
          "advantages",
        ].map((field) => (
          <div key={field} className="space-y-1">
            <label className="font-semibold capitalize block">
              {field.replace(/([A-Z])/g, " $1")}:
            </label>
            {formData[field].map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <input
                  value={item}
                  onChange={(e) => handleChange(e, field, idx)}
                  className="border border-[#e2e2e2] outline-0 p-2 w-full rounded"
                />
                {formData[field].length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(field, idx)}
                    className="text-red-500 font-bold bg-red-100 p-2 rounded-md"
                  >
                    <MdDelete/>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField(field)}
              className="text-blue-600 text-sm border border-blue-600 p-2 rounded-md"
            >
              + Add More
            </button>
          </div>
        ))}
      </div>

      {/* Image Upload */}
      <div>
        <label className="font-semibold block mb-2">Hotel Images</label>

        <label
          htmlFor="imageUploadInput"
          className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500"
        >
          <input
            type="file"
            id="imageUploadInput"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <CloudUpload size={30} className="text-blue-500 mb-2" />
          <p className="md:text-base text-xs">Upload Image</p>
          <p className="uppercase md:text-[12px] text-[10px] text-center">
            svg, png, jpeg, webp, avif
          </p>
        </label>

        {images.length > 0 && (
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <MdClose size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={triggerImageUpload}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-sm rounded-md mt-4"
        >
          + Add Images
        </button>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Hotel
      </button>
    </form>
  );
};

export default AddNewHotel;
