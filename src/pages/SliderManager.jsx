import { useEffect, useState } from "react";
import { uploadSlider, getSliders, updateSlider, deleteSlider } from "../api/api";
import { CloudUpload, Trash2, Pencil } from "lucide-react";

export default function SliderManager() {
  const [image, setImage] = useState(null);
  const [imageWithName, setImageWithName] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchSliders = async () => {
    const res = await getSliders();
    setSliders(res.data);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview1(URL.createObjectURL(file));
    }
  };

  const handleImageWithNameChange = (e) => {
    const file = e.target.files[0];
    setImageWithName(file);
    if (file) {
      setPreview2(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("imageWithName", imageWithName);

    if (editId) {
      await updateSlider(editId, formData);
      setSuccessMsg("Slider updated successfully ✅");
    } else {
      await uploadSlider(formData);
      setSuccessMsg("Slider added successfully ✅");
    }

    fetchSliders();

    // Reset state
    setImage(null);
    setImageWithName(null);
    setPreview1(null);
    setPreview2(null);
    setEditId(null);

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      await deleteSlider(id);
      fetchSliders();
      setSuccessMsg("Slider deleted ✅");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleEdit = (slider) => {
    setEditId(slider._id);
    setPreview1(slider.image);
    setPreview2(slider.imageWithName);
  };

  const cancelEdit = () => {
    setEditId(null);
    setImage(null);
    setImageWithName(null);
    setPreview1(null);
    setPreview2(null);
  };

  return (
    <div className="p-6 py-2">
      <h1 className="text-xl font-bold mb-4">Manage Slider Images</h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        <label
          htmlFor="firstImage"
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer w-52 h-52 flex items-center justify-center flex-col transition hover:border-blue-500"
        >
          {preview1 ? (
            <img
              src={preview1}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <>
              <CloudUpload size={30} className="text-blue-500 mb-2" />
              <p>Upload first image</p>
              <p className="uppercase text-[12px]">svg, png, jpeg, webp, avif</p>
            </>
          )}
          <input
            type="file"
            id="firstImage"
            className="hidden"
            onChange={handleImageChange}
            required={!editId}
          />
        </label>

        <label
          htmlFor="secondImage"
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer w-52 h-52 flex items-center justify-center flex-col transition hover:border-blue-500"
        >
          {preview2 ? (
            <img
              src={preview2}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <>
              <CloudUpload size={30} className="text-blue-500 mb-2" />
              <p>Upload hover image</p>
              <p className="uppercase text-[12px]">svg, png, jpeg, webp, avif</p>
            </>
          )}
          <input
            type="file"
            id="secondImage"
            className="hidden"
            onChange={handleImageWithNameChange}
            required={!editId}
          />
        </label>

        <div className="flex flex-col gap-2 items-center self-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer h-12"
          >
            {editId ? "Update Slide" : "Add this Slide"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-red-500 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {successMsg && (
        <p className="text-green-600 text-center font-medium m-4">{successMsg}</p>
      )}

      <div className="mt-6 grid md:grid-cols-3 grid-cols-2 gap-4">
        {sliders.map((slider) => (
          <div
            key={slider._id}
            className="p-2 border border-[#b5b5b5] rounded relative group"
          >
            <img
              src={slider.image}
              alt="Image"
              className="w-full h-40 object-cover"
            />
            <img
              src={slider.imageWithName}
              alt="With Name"
              className="w-full h-40 object-contain mt-2 bg-black/60"
            />

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(slider)}
                className="bg-yellow-500 p-1 rounded text-white"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="bg-red-600 p-1 rounded text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
