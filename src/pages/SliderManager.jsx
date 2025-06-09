import { useEffect, useState } from "react";
import {
  addMoreHotelImages,
  updateHotelImageByImageId,
  getSliders,
  updateSlider,
  deleteImageFromHotelImage,
  deleteSlider,
} from "../api/api";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { CloudUpload } from "lucide-react";

export default function SliderManager() {
  const [sliderData, setSliderData] = useState(null);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [imageWithName, setImageWithName] = useState(null);
  const [link, setLink] = useState("");
  const [heading, setHeading] = useState("");
  const [quote, setQuote] = useState("");
  const [editImageId, setEditImageId] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  useEffect(() => {
    fetchSlider();
  }, []);

  const fetchSlider = async () => {
    const res = await getSliders();
    const data = res.data[0];
    setSliderData(data);
    setImages(data?.images || []);
    setHeading(data?.heading || "");
    setQuote(data?.quote || "");
  };

  const resetForm = () => {
    setImage(null);
    setImageWithName(null);
    setLink("");
    setPreview1(null);
    setPreview2(null);
    setEditImageId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sliderData?._id) return;

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (imageWithName) formData.append("imageWithName", imageWithName);
    formData.append("link", link);

    if (editImageId) {
      await updateHotelImageByImageId(editImageId, sliderData._id, formData);
    } else {
      await addMoreHotelImages(sliderData._id, formData);
    }

    await fetchSlider();
    resetForm();
  };

  const handleUpdateHeadingQuote = async () => {
    if (!sliderData?._id) return;

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("quote", quote);

    await updateSlider(sliderData._id, formData);
    await fetchSlider();
  };

  const handleDeleteImage = async (imgId) => {
    await deleteImageFromHotelImage(sliderData._id, imgId);
    await fetchSlider();
  };

  const handleDeleteSlider = async () => {
    await deleteSlider(sliderData._id);
    setSliderData(null);
    setImages([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 font-sans bg-gray-50 min-h-screen">
      <h2 className="md:text-2xl text-xl font-bold border-b border-gray-300 pb-2 mb-4">
        Famous Hotel Manager
      </h2>

      {/* Heading & Quote Section */}
      <section className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Update Heading & Quote
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="flex-1 border border-[#e2e2e2] outline-0 rounded px-4 py-2 "
          />
          <input
            type="text"
            placeholder="Quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="flex-1 border border-[#e2e2e2] outline-0 rounded px-4 py-2 "
          />
          <button
            onClick={handleUpdateHeadingQuote}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Update
          </button>
        </div>
      </section>

      {/* Add/Edit Image Form */}
      <section className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">
          {editImageId ? "Edit Image" : "Add New Image"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:items-center gap-6"
        >
          <div className="flex flex-col">
            <label
              htmlFor="image"
              className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500"
            >
              {preview1 ? (
                <img
                  src={preview1}
                  alt="Preview"
                  className="w-full h-full object-cover rounded shadow"
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
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview1(URL.createObjectURL(e.target.files[0]));
                }}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500">
              {preview2 ? (
                <img
                  src={preview2}
                  alt="Preview"
                  className="mt-2 w-32 h-20 object-contain invert rounded shadow"
                />
              ) : (
                <>
                  <CloudUpload size={30} className="text-blue-500 mb-2" />
                  <p className="md:text-base text-xs">Upload Image with Name</p>
                  <p className="uppercase md:text-[12px] text-[10px] text-center">
                    svg, png, jpeg, webp, avif
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageWithName(e.target.files[0]);
                  setPreview2(URL.createObjectURL(e.target.files[0]));
                }}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="" className="mb-1 font-medium text-gray-600">
                Link
              </label>
              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="border border-[#e2e2e2] outline-0 rounded px-4 py-2 "
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {editImageId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </section>

      {/* Images List */}
      <section className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Hotel Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images?.map((img) => (
            <div
              key={img._id}
              className="border border-gray-300 rounded p-4 bg-gray-50 flex flex-col items-center space-y-3"
            >
              <label htmlFor="">Image</label>
              <img
                src={img.image}
                alt="Image"
                className="w-full h-40 object-cover rounded shadow"
              />
              <label htmlFor="">Image with Name</label>
              <img
                src={img.imageWithName}
                alt="Image With Name"
                className="w-full h-24 object-contain rounded shadow invert"
              />
              <p>
                Link :{" "}
                <span className="text-sm text-indigo-700 truncate w-full text-center">
                  {img.link}
                </span>
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setEditImageId(img._id);
                    setLink(img.link);
                    setPreview1(img.image);
                    setPreview2(img.imageWithName);
                  }}
                  className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer"
                >
                  <HiPencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteImage(img._id)}
                  className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={handleDeleteSlider}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded w-full sm:w-auto hover:bg-red-700 transition"
      >
        Delete Entire Slider
      </button>
    </div>
  );
}
