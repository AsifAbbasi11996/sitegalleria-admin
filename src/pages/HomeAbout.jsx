import { useEffect, useState } from "react";
import {
  addHomeAbout,
  getHomeAbout,
  updateHomeAbout,
  deleteHomeAbout,
} from "../api/homeApi";
import { CloudUpload } from "lucide-react"; // or use react-icons
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const HomeAbout = () => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    fetchAbouts();
  }, []);

  const fetchAbouts = async () => {
    const res = await getHomeAbout();
    setAbouts(res.data);
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setTitle("");
    setHeading("");
    setDescription("");
    setLink("");
    setEditId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editId) {
        await updateHomeAbout(editId, formData);
        toast.success("About updated succssfully", { duration: 5000 });
      } else {
        await addHomeAbout(formData);
        toast.success("About added succssfully", { duration: 5000 });
      }

      await fetchAbouts();
      resetForm();
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Error submitting form ", { duration: 5000 });
    }
  };

  const handleEdit = (about) => {
    window.scrollTo(0, 0);
    setEditId(about._id);
    setTitle(about.title);
    setHeading(about.heading);
    setDescription(about.description);
    setLink(about.link);
    setPreview(about.image);
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this item?")) return;
      await deleteHomeAbout(id);
      toast.success("About deleted successfully", { duration: 5000 });
      fetchAbouts();
    } catch (error) {
      toast.error("Error in deleting about", { duration: 5000 });
    }
  };

  return (
    <div className="p-4">
      <h1 className="md:text-2xl text-xl font-bold text-center mb-4">
        Manage Home About section
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          className="border border-[#e2e2e2] px-3 py-2 rounded w-full outline-0 md:text-base text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Heading"
          className="border border-[#e2e2e2] px-3 py-2 rounded w-full outline-0 md:text-base text-sm"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border border-[#e2e2e2] px-3 py-2 rounded w-full h-40 outline-0 md:text-base text-sm"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link"
          className="border border-[#e2e2e2] px-3 py-2 rounded w-full outline-0 md:text-base text-sm"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        {/* Styled Image Upload */}
        <label
          htmlFor="aboutImage"
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
              <p className="md:text-base text-xs">Upload About Image</p>
              <p className="uppercase md:text-[12px] text-[10px] text-center">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="aboutImage"
            name="image"
            className="hidden"
            onChange={handleImageChange}
            required={!editId}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:text-base text-sm"
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-red-600 text-white px-4 py-2 rounded md:text-base text-sm"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr className="my-6" />

      {/* List of entries */}
      <div className="">
        {abouts.map((about) => (
          <div
            key={about._id}
            className="border border-[#e4e4e4] rounded-lg p-4 shadow flex flex-col md:flex-row items-start gap-4"
          >
            <img
              src={about.image}
              alt={about.title}
              className="md:w-56 w-full h-40 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{about.heading}</h3>
              <p className="text-sm text-gray-600 mb-2">{about.description}</p>
              <p>
                Link :{" "}
                <span className="text-blue-600 text-sm">{about.link}</span>
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(about)}
                  className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer"
                >
                  <HiPencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(about._id)}
                  className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAbout;
