import { useEffect, useState } from "react";
import { CloudUpload, Trash2, Pencil } from "lucide-react";
import {
  getAllSlider,
  addSlider,
  updateSlider,
  deleteSlider,
} from "../api/homeApi";

const HomeSlider = () => {
  const [sliderImage, setSliderImage] = useState(null);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchSliders = async () => {
    try {
      const res = await getAllSlider();
      setSliders(res.data);
    } catch (err) {
      console.error("Error fetching sliders:", err.message);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSliderImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sliderImage && !text && !editId) return;

    const formData = new FormData();
    if (sliderImage) formData.append("slider", sliderImage);
    if (text) formData.append("text", text);

    try {
      if (editId) {
        await updateSlider(editId, formData);
        setSuccessMsg("Slider updated successfully ✅");
      } else {
        await addSlider(formData);
        setSuccessMsg("Slider added successfully ✅");
      }

      fetchSliders();
      setText("");
      setSliderImage(null);
      setPreview(null);
      setEditId(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error submitting form:", err.message);
    }
  };

  const handleEdit = (slider) => {
    setEditId(slider._id);
    setText(slider.text || "");
    setPreview(slider.slider);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        await deleteSlider(id);
        setSuccessMsg("Slider deleted successfully ❌");
        fetchSliders();
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        console.error("Error deleting slider:", err.message);
      }
    }
  };

  return (
    <div className="p-6 py-2">
      <h1 className="text-xl font-bold mb-4">Home Slider Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-center gap-4 flex-wrap p-4"
      >
        <div>
          <label
            htmlFor="sliderImage"
            className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer w-52 h-52 flex items-center justify-center flex-col transition hover:border-blue-500"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <CloudUpload size={30} className="text-blue-500 mb-2" />
                <p className="text-sm mt-2">Upload Slider</p>
                <p className="text-xs text-gray-400">jpeg, png, webp, avif</p>
              </>
            )}
            <input
              type="file"
              id="sliderImage"
              className="hidden"
              onChange={handleImageChange}
              required={!editId}
            />
          </label>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-2 mb-10">
            <label
              htmlFor="sliderText"
              className="text-sm font-medium text-gray-700"
            >
              Slider Text
            </label>
            <input
              id="sliderText"
              type="text"
              placeholder="Enter slider text"
              className="border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-80 transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
       

        <button
          type="submit"
          className="px-5 py-2 mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow transition"
        >
          {editId ? "Update Slide" : "Add Slide"}
        </button>
         </div>
      </form>

      {successMsg && (
        <p className="text-green-600 text-center font-medium mt-4">
          {successMsg}
        </p>
      )}

      <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="border p-3 rounded relative">
            <img
              src={slider.slider}
              alt="Slider"
              className="w-full h-40 object-cover rounded"
            />
            {slider.text && (
              <p className="mt-2 text-sm font-medium">{slider.text}</p>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(slider)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
