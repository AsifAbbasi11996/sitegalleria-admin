import { useEffect, useState } from "react";
import {
  fetchBanquets,
  addBanquet,
  updateBanquet,
  deleteBanquet,
} from "../api/roomsAndbanquetsApi";
import { CloudUpload } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import toast from "react-hot-toast";

const BanquetManager = () => {
  const [banquets, setBanquets] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    description: "",
    features: [""],
    image: null,
  });
  const [editingBanquetId, seteditingBanquetId] = useState(null);
  const [preview, setPreview] = useState(null);

  const getBanquets = async () => {
    const { data } = await fetchBanquets();
    setBanquets(data);
  };

  useEffect(() => {
    getBanquets();
  }, []);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      // Create preview URL for the selected file
      if (file) {
        // Clean up previous preview URL if it exists
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeatureInput = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeatureInput = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      path: "",
      description: "",
      features: [""],
      image: null,
    });
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    seteditingBanquetId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("path", formData.path);
    payload.append("description", formData.description);
    payload.append("features", formData.features.join(","));
    if (formData.image) payload.append("image", formData.image);

    try {
      if (editingBanquetId) {
        await updateBanquet(editingBanquetId, payload);
        toast.success("Banquet updated successfully", { duration: 5000 });
      } else {
        await addBanquet(payload);
        toast.success("Banquest added successfully", { duration: 5000 });
      }

      resetForm();
      getBanquets();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error in submitting form", { duration: 5000 });
    }
  };

  const handleEdit = (banquet) => {
    window.scrollTo(0, 0);
    seteditingBanquetId(banquet._id);
    setFormData({
      title: banquet.title,
      path: banquet.path,
      description: banquet.description,
      features: banquet.features,
      image: banquet.image,
    });
    // Clean up previous preview URL if it exists
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(banquet.image);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this banquet?")) {
        await deleteBanquet(id);
        toast.success("Banquet deleted successfully", { duration: 5000 });
        getBanquets();
      }
    } catch (error) {
      toast.error("Banquet not deleted", { duration: 5000 });
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {editingBanquetId ? "Edit Banquet" : "Add Banquet"}
        </h2>
        {editingBanquetId && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-white hover:text-gray-200 bg-red-500 rounded-md font-medium"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-4 pb-8 mb-6 space-y-4">
        <div className="flex sm:flex-row flex-col sm:gap-6 gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded outline-0 md:text-base text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="path"
            placeholder="Path"
            value={formData.path}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded outline-0 md:text-base text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded outline-0 md:text-base text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
        />

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Features
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded outline-0 md:text-base text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeatureInput(index)}
                  className="bg-red-100 text-red-500 p-2 rounded-md hover:bg-red-200 transition-colors"
                >
                  <MdDelete size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeatureInput}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
          >
            Add More Feature
          </button>
        </div>

        <label
          htmlFor="image"
          className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:w-52 md:h-52 w-40 h-40 flex items-center justify-center flex-col transition hover:border-blue-500 group"
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
              <p className="md:text-base text-xs">Upload Image</p>
              <p className="uppercase md:text-[12px] text-[10px] text-center">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            required={!editingBanquetId}
            className="hidden"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors"
          >
            {editingBanquetId ? "Update" : "Add"}
          </button>
          {editingBanquetId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Banquet List</h3>
      {banquets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No banquets added yet</p>
          <p className="text-sm">Add your first banquet using the form above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {banquets.map((banquet) => (
            <div
              key={banquet._id}
              className="bg-white p-4 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-800">
                  {banquet.title}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(banquet)}
                    className="bg-green-100 text-green-500 p-2 rounded-md hover:bg-green-200 transition-colors"
                    title="Edit banquet"
                  >
                    <HiPencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(banquet._id)}
                    className="bg-red-100 text-red-500 p-2 rounded-md hover:bg-red-200 transition-colors"
                    title="Delete banquet"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                Path:{" "}
                <span className="font-mono bg-gray-100 px-1 rounded">
                  {banquet.path}
                </span>
              </p>

              {banquet.image && (
                <img
                  src={banquet.image}
                  alt={banquet.title}
                  className="w-full lg:h-40 h-56 object-cover mb-3 rounded"
                />
              )}

              <p className="text-gray-700 mb-3 text-sm">
                {banquet.description}
              </p>

              <div>
                <p className="font-medium text-gray-800 mb-2">Features:</p>
                <ul className="space-y-1">
                  {banquet.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BanquetManager;
