import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdClose, MdDelete } from "react-icons/md";
import { CloudUpload } from "lucide-react";
import { getDestinations } from "../api/api";
import { getHotelById, updateHotel } from "../api/hotelApi";

const EditNewHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [form, setForm] = useState({
    hotelName: "",
    address: "",
    pricePerNight: "",
    taxRate: "",
    rating: "",
    latitude: "",
    longitude: "",
    destination: "",
    descriptionParagraphs: [""],
    activities: [""],
    paymentMethods: [""],
    services: [""],
    safetyAndSecurity: [""],
    staffLanguages: [""],
    general: [""],
    checkInOut: [""],
    advantages: [""],
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await getHotelById(id);
        const data = res.data;

        setForm({
          hotelName: data.hotelName,
          address: data.address,
          pricePerNight: data.pricePerNight,
          taxRate: data.taxRate,
          rating: data.rating,
          latitude: data.location?.coordinates?.[1] || "",
          longitude: data.location?.coordinates?.[0] || "",
          destination: data.destination?._id || data.destination || "",
          descriptionParagraphs: data.descriptionParagraphs || [""],
          activities: data.amenities.activities || [""],
          paymentMethods: data.amenities.paymentMethods || [""],
          services: data.amenities.services || [""],
          safetyAndSecurity: data.amenities.safetyAndSecurity || [""],
          staffLanguages: data.amenities.staffLanguages || [""],
          general: data.policies.general || [""],
          checkInOut: data.policies.checkInOut || [""],
          advantages: data.advantages || [""],
        });

        setExistingImages(data.images || []);
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    };

    fetchHotel();
  }, [id]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getDestinations();
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
      const updatedArray = [...form[field]];
      updatedArray[index] = value;
      setForm({ ...form, [field]: updatedArray });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeField = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleImageChange = (e) => {
    setNewImages([...newImages, ...e.target.files]);
  };

  const removeNewImage = (index) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form fields
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    // Append new images
    newImages.forEach((img) => formData.append("images", img));

    // Send existing image URLs as JSON string
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      await updateHotel(id, formData);
      alert("Hotel updated successfully");
      navigate("/hotelpage/all-hotels");
    } catch (err) {
      console.error("Error updating hotel:", err);
      alert("Failed to update hotel.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto lg:p-6 p-2 bg-white shadow rounded space-y-6"
    >
      <h2 className="md:text-2xl text-xl font-bold text-center">Edit Hotel</h2>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {[
          "hotelName",
          "address",
          "pricePerNight",
          "taxRate",
          "rating",
          "latitude",
          "longitude",
        ].map((field) => (
          <div key={field}>
            <label className="block font-semibold capitalize mb-2 sm:text-base text-sm">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="w-full border border-[#e2e2e2] outline-0 p-2 rounded sm:text-base text-sm"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="font-semibold capitalize block mb-2 sm:text-base text-sm">
            Destination
          </label>
          <select
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 outline-0 rounded sm:text-base text-sm"
          >
            <option value="">Select a destination</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.destinationName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1 sm:text-base text-sm">Description Paragraphs</label>
        {form.descriptionParagraphs.map((para, index) => (
          <div key={index} className="flex gap-2 items-start mb-2">
            <textarea
              value={para}
              onChange={(e) => handleChange(e, "descriptionParagraphs", index)}
              className="w-full border border-gray-300 rounded p-2 outline-0 sm:text-base text-sm"
              rows={3}
            />
            {form.descriptionParagraphs.length > 1 && (
              <button
                type="button"
                onClick={() => removeField("descriptionParagraphs", index)}
                className="text-red-500 bg-red-100 font-bold p-2 rounded-md"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("descriptionParagraphs")}
          className="text-blue-600 border border-blue-600 p-2 rounded-md sm:text-base text-sm"
        >
          + Add another paragraph
        </button>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {[
          "activities",
          "paymentMethods",
          "services",
          "safetyAndSecurity",
          "staffLanguages",
          "general",
          "checkInOut",
          "advantages",
        ].map((field) => (
          <div key={field}>
            <label className="block font-semibold capitalize mb-2 sm:text-base text-sm">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {form[field].map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <input
                  value={item}
                  onChange={(e) => handleChange(e, field, idx)}
                  className="w-full border border-gray-300 p-2 rounded outline-0 sm:text-base text-sm"
                  placeholder={`${field} ${idx + 1}`}
                />
                {form[field].length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(field, idx)}
                    className="text-red-500 bg-red-100 font-bold p-2 rounded-md"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField(field)}
              className="text-blue-600 border border-blue-600 p-2 rounded-md sm:text-base text-sm"
            >
              + Add More
            </button>
          </div>
        ))}
      </div>

      {/* Images Section */}
      <div>
        <label className="block font-semibold mb-2 sm:text-base text-sm">Hotel Images</label>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-4">
            {existingImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt="Existing"
                  className="w-full h-28 md:h-40 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <MdClose size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New image preview */}
        {newImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-4">
            {newImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-28 md:h-40 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          htmlFor="image"
          className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500"
        >
          <input
            type="file"
            id="image"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <CloudUpload size={30} className="text-blue-500 mb-2" />
          <p className="md:text-base text-xs">Upload New Image</p>
          <p className="uppercase md:text-[12px] text-[10px] text-center">
            svg, png, jpeg, webp, avif
          </p>
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditNewHotel;
