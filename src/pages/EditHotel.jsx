import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById, updateHotel } from "../api/hotelApi";

const EditHotel = () => {
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [existingLogo, setExistingLogo] = useState("");
  const [existingBgImage, setExistingBgImage] = useState("");
  const [slides, setSlides] = useState([
    { title: "", desc: "", link: "", bg: null, existingBg: "" },
  ]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await getHotelById(id);
        const hotel = res.data;

        setDescription(hotel.content?.description || "");
        setExistingLogo(hotel.content?.logo || "");
        setExistingBgImage(hotel.bgImage || "");

        setSlides(
          hotel.slides.map((slide) => ({
            title: slide.title || "",
            desc: slide.desc || "",
            link: slide.link || "",
            bg: null,
            existingBg: slide.bg || "",
          }))
        );
      } catch (error) {
        console.error("Error loading hotel data:", error);
      }
    };

    fetchHotel();
  }, [id]);

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const addSlide = () => {
    if (slides.length < 5) {
      setSlides([...slides, { title: "", desc: "", link: "", bg: null, existingBg: "" }]);
    }
  };

  const removeSlide = (index) => {
    const updatedSlides = [...slides];
    updatedSlides.splice(index, 1);
    setSlides(updatedSlides);
  };

  const handleUpdateHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    if (logo) formData.append("logo", logo);
    if (bgImage) formData.append("bgImage", bgImage);

    slides.forEach((slide, index) => {
      const i = index + 1;
      if (slide.title) formData.append(`title${i}`, slide.title);
      if (slide.desc) formData.append(`desc${i}`, slide.desc);
      if (slide.link) formData.append(`link${i}`, slide.link);
      if (slide.bg) formData.append(`slide${i}`, slide.bg);
    });

    try {
      await updateHotel(id, formData);
      alert("Hotel updated successfully!");
    } catch (error) {
      console.error("Failed to update hotel:", error);
      alert("Error updating hotel");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Hotel</h2>
      <form onSubmit={handleUpdateHotel} encType="multipart/form-data" className="space-y-6">
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-64"
          />
        </div>

        <div>
          <label className="block font-medium">Logo</label>
          {existingLogo && (
            <img src={existingLogo} alt="Logo" className="w-24 h-24 object-cover mb-2 invert" />
          )}
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className="block w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Background Image</label>
          {existingBgImage && (
            <img src={existingBgImage} alt="Background" className="w-full h-40 object-cover mb-2" />
          )}
          <input
            type="file"
            onChange={(e) => setBgImage(e.target.files[0])}
            className="block w-full"
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Slides</h4>
          {slides.map((slide, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
              <div className="mb-2">
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Description</label>
                <input
                  type="text"
                  value={slide.desc}
                  onChange={(e) => handleSlideChange(index, "desc", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Link</label>
                <input
                  type="text"
                  value={slide.link}
                  onChange={(e) => handleSlideChange(index, "link", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium">Slide Background</label>
                {slide.existingBg && (
                  <img
                    src={slide.existingBg}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-32 object-cover mb-2"
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => handleSlideChange(index, "bg", e.target.files[0])}
                  className="block w-full"
                />
              </div>

              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSlide(index)}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Remove Slide
                </button>
              )}
            </div>
          ))}
          {slides.length < 5 && (
            <button
              type="button"
              onClick={addSlide}
              className="text-blue-600 hover:underline"
            >
              + Add Slide
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
