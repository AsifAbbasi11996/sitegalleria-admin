import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteSlide, getHotelById, updateHotel } from "../api/homehotelApi";
import { CloudUpload } from "lucide-react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

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
            _id: slide._id,
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
    try {
      if (slides.length < 10) {
        setSlides([
          ...slides,
          { title: "", desc: "", link: "", bg: null, existingBg: "" },
        ]);
      }
      toast.success("Slide added successfully", { duration: 5000 });
    } catch (error) {
      toast.error("Error adding slide", { duration: 5000 });
    }
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      await deleteSlide(id, slideId);
      setSlides(slides.filter((s) => s._id !== slideId)); // Update local state
      toast.success("Slide deleted successfully", { duration: 5000 });
    } catch (error) {
      console.error("Failed to delete slide", error);
      toast.error("Error deleting slide", { duration: 5000 });
    }
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
      toast.success("Hotel updated successfully!", { duration: 5000 });
    } catch (error) {
      console.error("Failed to update hotel:", error);
      toast.error("Error updating hotel", { duration: 5000 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6 bg-white shadow rounded-lg md:mt-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
        Edit Hotel
      </h2>
      <form
        onSubmit={handleUpdateHotel}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-64 text-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Logo</label>
          {logo ? (
            <img
              src={URL.createObjectURL(logo)}
              alt="New Logo Preview"
              className="w-24 h-24 object-contain mb-2"
            />
          ) : existingLogo ? (
            <img
              src={existingLogo}
              alt="Existing Logo"
              className="w-24 h-24 object-contain mb-2"
            />
          ) : null}

          <div className="border-2 border-dashed border-[#e1e1e1] p-4 rounded-md">
            <label htmlFor="logo" className="flex items-center flex-col">
              <input
                type="file"
                id="logo"
                onChange={(e) => setLogo(e.target.files[0])}
                className="hidden w-full"
              />
              <CloudUpload size={32} className="text-blue-500 mb-2" />
              <p className="text-sm font-medium">
                Click or drag logo to upload
              </p>
              <p className="text-xs text-gray-400">JPEG, PNG, WEBP, AVIF</p>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Background Image</label>
          {bgImage ? (
            <img
              src={URL.createObjectURL(bgImage)}
              alt="New Background Preview"
              className="w-full h-40 object-cover mb-2"
            />
          ) : existingBgImage ? (
            <img
              src={existingBgImage}
              alt="Existing Background"
              className="w-full h-40 object-cover mb-2"
            />
          ) : null}

          <div className="border-2 border-dashed border-[#e1e1e1] p-4 rounded-md">
            <label htmlFor="bgImage" className="flex items-center flex-col">
              <input
                id="bgImage"
                type="file"
                onChange={(e) => setBgImage(e.target.files[0])}
                className="hidden w-full"
              />
              <CloudUpload size={32} className="text-blue-500 mb-2" />
              <p className="text-sm font-medium">
                Click or drag bg image to upload
              </p>
              <p className="text-xs text-gray-400">JPEG, PNG, WEBP, AVIF</p>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Slides</h4>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg mb-4"
            >
              <p className="mb-2 text-center">Slide {index + 1}</p>
              <div className="mb-2">
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) =>
                    handleSlideChange(index, "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  type="text"
                  value={slide.desc}
                  onChange={(e) =>
                    handleSlideChange(index, "desc", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-32"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium mb-2">Link</label>
                <input
                  type="text"
                  value={slide.link}
                  onChange={(e) =>
                    handleSlideChange(index, "link", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-2">
                <label className="block font-medium mb-2">
                  Slide Background
                </label>
                {slide.bg ? (
                  <img
                    src={URL.createObjectURL(slide.bg)}
                    alt={`New Slide ${index + 1} Preview`}
                    className="w-full h-32 object-cover mb-2"
                  />
                ) : slide.existingBg ? (
                  <img
                    src={slide.existingBg}
                    alt={`Existing Slide ${index + 1}`}
                    className="w-full h-32 object-cover mb-2"
                  />
                ) : null}

                <div className="border-2 border-dashed border-[#e1e1e1] p-4 rounded-md">
                  <label
                    htmlFor={`slide-bg-${index}`}
                    className="flex items-center flex-col"
                  >
                    <input
                      id={`slide-bg-${index}`}
                      type="file"
                      onChange={(e) =>
                        handleSlideChange(index, "bg", e.target.files[0])
                      }
                      className="hidden w-full"
                    />
                    <CloudUpload size={32} className="text-blue-500 mb-2" />
                    <p className="text-sm font-medium">
                      Click or drag bg slider to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      JPEG, PNG, WEBP, AVIF
                    </p>
                  </label>
                </div>
              </div>

              {slide._id ? (
                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide._id)}
                  className="text-red-600 bg-red-100 p-2 rounded-md"
                >
                  <MdDelete size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const updatedSlides = slides.filter((_, i) => i !== index);
                    setSlides(updatedSlides);
                  }}
                  className="text-yellow-600 bg-yellow-100 p-2 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {slides.length < 10 && (
            <button
              type="button"
              onClick={addSlide}
              className="text-white hover:underline bg-green-800 p-3 rounded-md text-sm"
            >
              Click here to Add Slide
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 px-4 rounded hover:bg-blue-700 transition md:text-base text-sm mb-10"
        >
          Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
