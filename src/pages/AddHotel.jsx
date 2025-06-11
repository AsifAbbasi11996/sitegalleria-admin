import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { addHotel } from "../api/homehotelApi"; // import your API helper

const MAX_SLIDES = 10; // updated max slides

const AddHotel = () => {
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [bgImagePreview, setBgImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Slides data: start with 1 slide
  const [slides, setSlides] = useState([
    { title: "", desc: "", link: "", bg: null, preview: null },
  ]);

  const addSlide = () => {
    if (slides.length >= MAX_SLIDES) return;
    setSlides([
      ...slides,
      { title: "", desc: "", link: "", bg: null, preview: null },
    ]);
  };

  const removeSlide = (index) => {
    if (slides.length === 1) return;
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };

  const handleSlideImageChange = (index, file) => {
    const newSlides = [...slides];
    newSlides[index].bg = file;
    newSlides[index].preview = file ? URL.createObjectURL(file) : null;
    setSlides(newSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bgImage || !logo) {
      alert("Please upload both bgImage and logo.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("logo", logo);
    formData.append("bgImage", bgImage);

    slides.forEach((slide, i) => {
      const idx = i + 1;
      formData.append(`title${idx}`, slide.title);
      formData.append(`desc${idx}`, slide.desc);
      formData.append(`link${idx}`, slide.link);
      if (slide.bg) formData.append(`slide${idx}`, slide.bg);
    });

    try {
      setLoading(true);
      await addHotel(formData);
      alert("Hotel added successfully!");

      // Reset form
      setDescription("");
      setLogo(null);
      setLogoPreview(null);
      setBgImage(null);
      setBgImagePreview(null);
      setSlides([{ title: "", desc: "", link: "", bg: null, preview: null }]);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
        Add Hotel
      </h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full text-sm border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter hotel description"
            required
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Logo:</label>
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setLogo(file);
                setLogoPreview(file ? URL.createObjectURL(file) : null);
              }}
              className="hidden"
              name="logo"
              required
            />
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-full h-48 object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 space-y-1">
                <CloudUpload size={30} className="text-blue-600" />
                <p className="md:text-base text-sm">Upload logo</p>
                <p className="uppercase md:text-[12px] text-[10px]">
                  svg, png, jpeg, webp, avif
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Background Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Main Background Image:
          </label>
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setBgImage(file);
                setBgImagePreview(file ? URL.createObjectURL(file) : null);
              }}
              className="hidden"
              name="bgImage"
              required
            />
            {bgImagePreview ? (
              <img
                src={bgImagePreview}
                alt="Background Preview"
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 space-y-1">
                <CloudUpload size={30} className="text-blue-600" />
                <p className="md:text-base text-sm">Upload main bg image</p>
                <p className="uppercase md:text-[12px] text-[10px]">
                  svg, png, jpeg, webp, avif
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Slides */}
        <div>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-6 space-y-4 relative"
            >
              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSlide(index)}
                  className="absolute top-2 right-2 text-red-600 font-bold text-lg hover:text-red-800"
                  title="Remove Slide"
                >
                  <X />
                </button>
              )}

              <p className="text-center">Slide {index + 1}</p>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  name={`title${index + 1}`}
                  value={slide.title}
                  onChange={(e) =>
                    handleSlideChange(index, "title", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Slide title"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Description:
                </label>
                <input
                  type="text"
                  name={`desc${index + 1}`}
                  value={slide.desc}
                  onChange={(e) =>
                    handleSlideChange(index, "desc", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Slide description"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Link:
                </label>
                <input
                  type="text"
                  name={`link${index + 1}`}
                  value={slide.link}
                  onChange={(e) =>
                    handleSlideChange(index, "link", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Slide link "
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Slider Background Image:
                </label>
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleSlideImageChange(index, e.target.files[0])
                    }
                    name={`slide${index + 1}`}
                    className="hidden"
                  />
                  {slide.preview ? (
                    <img
                      src={slide.preview}
                      alt={`Slide ${index + 1} Preview`}
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-1">
                      <CloudUpload size={30} className="text-blue-600" />
                      <p className="md:text-base text-sm">
                        Upload slider bg image
                      </p>
                      <p className="uppercase md:text-[12px] text-[10px]">
                        svg, png, jpeg, webp, avif
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          ))}
          <h4 className="text-xl font-semibold mb-4 text-gray-700 flex justify-between items-center">
            Slides
            <button
              type="button"
              onClick={addSlide}
              disabled={slides.length >= MAX_SLIDES}
              className={`px-3 py-1 rounded text-white text-sm ${
                slides.length >= MAX_SLIDES
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Add Slide
            </button>
          </h4>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          } transition-colors mb-10 md:text-base text-sm`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Hotel"}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
