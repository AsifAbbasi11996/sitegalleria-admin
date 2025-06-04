import React, { useEffect, useState } from "react";
import {
  getLogo,
  addLogo,
  updateLogo,
  deleteLogo,
} from "../api/logoApi"; // adjust path if necessary
import { CloudUpload } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

const LogoManager = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [logos, setLogos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchLogos = async () => {
    try {
      const res = await getLogo();
      setLogos(res.data);
    } catch (err) {
      console.error("Error fetching logos:", err);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!logoFile && !editId) {
      setMessage("Please select a logo image.");
      return;
    }

    const formData = new FormData();
    if (logoFile) formData.append("logo", logoFile);

    try {
      if (editId) {
        await updateLogo(editId, formData);
        setMessage("Logo updated successfully ✅");
      } else {
        await addLogo(formData);
        setMessage("Logo added successfully ✅");
      }
      resetForm();
      fetchLogos();
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error occurred while submitting.");
    }
  };

  const resetForm = () => {
    setLogoFile(null);
    setEditId(null);
    setPreview("");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (logo) => {
    setEditId(logo._id);
    setPreview(logo.logo);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      await deleteLogo(id);
      setMessage("Logo deleted successfully ❌");
      fetchLogos();
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="md:p-6 max-w-screen-md mx-auto">
      <h2 className="md:text-2xl text-xl font-bold mb-4 text-gray-800">Manage Logo</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        <label
          htmlFor="logo-upload"
          className="cursor-pointer w-full border-dashed border-2 border-gray-300 rounded p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 transition"
        >
          <CloudUpload size={32} className="text-blue-500 mb-2" />
          <p className="text-sm font-medium">Click or drag logo to upload</p>
          <p className="text-xs text-gray-400">PNG, SVG, JPEG</p>
          <input
            type="file"
            id="logo-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Logo Preview"
            className="w-40 h-40 object-contain mx-auto mt-2 invert"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          {editId ? "Update Logo" : "Add Logo"}
        </button>
      </form>

      {message && <p className="text-green-600 font-semibold mb-4">{message}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <div
            key={logo._id}
            className="border border-[#e4e4e4] p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={logo.logo}
              alt="Logo"
              className="w-full h-36 object-contain mb-3 invert"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleEdit(logo)}
                className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md"
                title="Edit"
              >
                <HiPencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(logo._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md"
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

export default LogoManager;
