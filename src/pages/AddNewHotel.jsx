import React, { useState } from "react";
import axios from "axios";

const AddNewHotel = () => {
  const [form, setForm] = useState({
    hotelName: "",
    address: "",
    rating: "",
    pricePerNight: "",
    taxRate: "",
    destination: "",
    coordinates: "",
  });

  const [descriptionParagraphs, setDescriptionParagraphs] = useState([""]);
  const [advantages, setAdvantages] = useState([""]);

  // Amenities
  const [activities, setActivities] = useState([""]);
  const [paymentMethods, setPaymentMethods] = useState([""]);
  const [services, setServices] = useState([""]);
  const [safetyAndSecurity, setSafetyAndSecurity] = useState([""]);
  const [staffLanguages, setStaffLanguages] = useState([""]);

  // Policies
  const [generalPolicies, setGeneralPolicies] = useState([""]);
  const [checkInOut, setCheckInOut] = useState([""]);

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleListChange = (index, setList, list) => (e) => {
    const updated = [...list];
    updated[index] = e.target.value;
    setList(updated);
  };

  const addField = (setList, list) => () => setList([...list, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Basic fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Repeatable arrays
    [
      ["descriptionParagraphs", descriptionParagraphs],
      ["advantages", advantages],
      ["activities", activities],
      ["paymentMethods", paymentMethods],
      ["services", services],
      ["safetyAndSecurity", safetyAndSecurity],
      ["staffLanguages", staffLanguages],
      ["general", generalPolicies],
      ["checkInOut", checkInOut],
    ].forEach(([key, values]) => {
      values.forEach((v) => formData.append(key, v));
    });

    // Images
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await axios.post("http://localhost:4000/api/hotels/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Hotel created successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create hotel");
    }
  };

  const renderListInput = (label, list, setList) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {list.map((item, index) => (
        <input
          key={index}
          value={item}
          onChange={handleListChange(index, setList, list)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded"
        />
      ))}
      <button type="button" onClick={addField(setList, list)} className="text-blue-600 text-sm">+ Add more</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Hotel</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid grid-cols-1 gap-4">

        {/* Basic fields */}
        {[
          { label: "Hotel Name", name: "hotelName" },
          { label: "Address", name: "address" },
          { label: "Price Per Night", name: "pricePerNight", type: "number" },
          { label: "Tax Rate", name: "taxRate", type: "number" },
          { label: "Rating", name: "rating", type: "number" },
          { label: "Destination ID", name: "destination" },
          { label: "Coordinates (longitude,latitude)", name: "coordinates" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required={["hotelName", "address", "pricePerNight", "taxRate", "coordinates"].includes(name)}
            />
          </div>
        ))}

        {/* Repeatable Sections */}
        {renderListInput("Description Paragraphs", descriptionParagraphs, setDescriptionParagraphs)}
        {renderListInput("Advantages", advantages, setAdvantages)}

        {/* Amenities */}
        <h3 className="text-lg font-semibold mt-4">Amenities</h3>
        {renderListInput("Activities", activities, setActivities)}
        {renderListInput("Payment Methods", paymentMethods, setPaymentMethods)}
        {renderListInput("Services", services, setServices)}
        {renderListInput("Safety & Security", safetyAndSecurity, setSafetyAndSecurity)}
        {renderListInput("Staff Languages", staffLanguages, setStaffLanguages)}

        {/* Policies */}
        <h3 className="text-lg font-semibold mt-4">Policies</h3>
        {renderListInput("General Policies", generalPolicies, setGeneralPolicies)}
        {renderListInput("Check-In / Check-Out", checkInOut, setCheckInOut)}

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            className="w-full"
            required
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Create Hotel
        </button>
      </form>
    </div>
  );
};

export default AddNewHotel;
