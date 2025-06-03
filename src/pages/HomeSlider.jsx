import { useEffect, useState } from "react";
import { CloudUpload } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
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
    <div className="md:p-6 p-2 py-2">
      <h1 className="md:text-xl text-lg font-bold mb-4">Home Slider Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-center gap-4 flex-wrap p-4"
      >
        <div>
          <label
            htmlFor="sliderImage"
            className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500"
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
                <p className="md:text-base text-xs">Upload Slider</p>
                 <p className="uppercase md:text-[12px] text-[10px] text-center">svg, png, jpeg, webp, avif</p>
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
          <div className="flex flex-col gap-2 md:mb-5 mb-3">
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
          className="px-5 py-2  bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow transition"
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

      <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="border border-[#e4e4e4] p-3 rounded relative">
            <img
              src={slider.slider}
              alt="Slider"
              className="w-full h-40 object-cover rounded"
            />
            {slider.text && (
              <p className="mt-2 text-sm font-medium">{slider.text}</p>
            )}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(slider)}
                className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer"
              >
                <HiPencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer"
              >
                <MdDelete size={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
