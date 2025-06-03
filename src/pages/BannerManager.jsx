import React, { useEffect, useState } from "react";
import {
  getAllBanner,
  addBanner,
  updateBanner,
  deleteBanner,
} from "../api/homeApi";
import { CloudUpload } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

const BannerManager = () => {
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [bgImage, setBgImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBanners = async () => {
    const res = await getAllBanner();
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBgImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !desc || (!bgImage && !editId)) {
      setMessage("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("desc", desc);
    if (bgImage) formData.append("bgImage", bgImage);

    try {
      if (editId) {
        await updateBanner(editId, formData);
        setMessage("Banner updated successfully ✅");
      } else {
        await addBanner(formData);
        setMessage("Banner added successfully ✅");
      }
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error occurred while submitting.");
    }
  };

  const resetForm = () => {
    setHeading("");
    setDesc("");
    setBgImage(null);
    setEditId(null);
    setPreview("");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (banner) => {
    setEditId(banner._id);
    setHeading(banner.heading);
    setDesc(banner.desc);
    setPreview(banner.bgImage);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deleteBanner(id);
      setMessage("Banner deleted successfully ❌");
      fetchBanners();
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Home Banners
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 mb-8 items-start"
      >
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="border p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="cursor-pointer w-full border-dashed border-2 border-gray-300 rounded p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 transition"
          >
            <CloudUpload size={32} className="text-blue-500 mb-2" />
            <p className="text-sm font-medium">Click or drag image to upload</p>
            <p className="text-xs text-gray-400">JPEG, PNG, WEBP, AVIF</p>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover mt-4 rounded shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="lg:col-span-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          {editId ? "Update Banner" : "Add Banner"}
        </button>
      </form>

      {message && (
        <p className="text-green-600 font-semibold mb-4">{message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={banner.bgImage}
              alt="Banner"
              className="w-full h-36 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {banner.heading}
            </h3>
            <p className="text-sm text-gray-600">{banner.desc}</p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleEdit(banner)}
                className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer transition"
                title="Edit"
              >
                <HiPencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(banner._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer transition"
                title="Delete"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerManager;
