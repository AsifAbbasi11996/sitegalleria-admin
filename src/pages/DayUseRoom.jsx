import { useEffect, useState } from "react";
import {
  addDayUseRoom,
  getDayUseRooms,
  deleteDayUseRoom,
  updateDayUseRoom,
} from "../api/dayUseRoomApi";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { CloudUpload } from "lucide-react";

const DayUseRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    mainHeading: "",
    subSections: [{ subHeading: "", points: [""] }],
  });
  const [image, setImage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await getDayUseRooms();
    setRooms(res.data);
  };

  const handleChange = (e, index = null, pointIndex = null) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev };

      if (name === "title" || name === "mainHeading") {
        updated[name] = value;
      } else if (name === "subHeading" && index !== null) {
        updated.subSections[index].subHeading = value;
      } else if (name === "point" && index !== null && pointIndex !== null) {
        updated.subSections[index].points[pointIndex] = value;
      }

      return updated;
    });
  };

  const addSubSection = () => {
    setFormData((prev) => ({
      ...prev,
      subSections: [...prev.subSections, { subHeading: "", points: [""] }],
    }));
  };

  const removeSubSection = (index) => {
    setFormData((prev) => {
      const updated = [...prev.subSections];
      updated.splice(index, 1);
      return { ...prev, subSections: updated };
    });
  };

  const addPoint = (index) => {
    setFormData((prev) => {
      const updated = [...prev.subSections];
      updated[index].points.push("");
      return { ...prev, subSections: updated };
    });
  };

  const removePoint = (sectionIndex, pointIndex) => {
    setFormData((prev) => {
      const updated = [...prev.subSections];
      updated[sectionIndex].points.splice(pointIndex, 1);
      return { ...prev, subSections: updated };
    });
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

    if (!image && !editId) {
      alert("Please upload an image");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("mainHeading", formData.mainHeading);
      if (image) data.append("image", image);

      formData.subSections.forEach((section, sectionIndex) => {
        data.append(`subHeading${sectionIndex + 1}`, section.subHeading);
        section.points.forEach((point, pointIndex) => {
          data.append(`point${sectionIndex + 1}_${pointIndex + 1}`, point);
        });
      });

      if (editId) {
        await updateDayUseRoom(editId, data);
        alert("Room updated successfully!");
      } else {
        await addDayUseRoom(data);
        alert("Room added successfully!");
      }

      setFormData({
        title: "",
        mainHeading: "",
        subSections: [{ subHeading: "", points: [""] }],
      });
      setImage(null);
      setEditId(null);
      fetchRooms();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit");
    }
  };

  const handleEdit = (room) => {
    setFormData({
      title: room.title,
      mainHeading: room.mainHeading,
      subSections: room.subSections,
    });
    setEditId(room._id);
    setImage(null);
    setPreview(room.image); // 👈 Show the current image in preview
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    await deleteDayUseRoom(id);
    fetchRooms();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {editId ? "Edit" : "Add"} Day Use Room
      </h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-3"
      >
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md outline-0 border-[#e2e2e2] sm:text-base text-sm"
            placeholder="Title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Main Heading</label>
          <input
            type="text"
            name="mainHeading"
            value={formData.mainHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded-md outline-0 border-[#e2e2e2] sm:text-base text-sm"
            placeholder="Main Heading"
          />
        </div>

        {formData.subSections.map((section, index) => (
          <div key={index} className="border border-[#e2e2e2] p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold">Sub Heading</label>
              {formData.subSections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubSection(index)}
                  className="text-red-500 text-sm font-semibold bg-red-100 p-2 rounded-md"
                >
                  Remove SubSection
                </button>
              )}
            </div>
            <input
              type="text"
              name="subHeading"
              placeholder="Sub Heading"
              className="w-full p-2 mb-2 border rounded-md outline-0 border-[#e2e2e2] sm:text-base text-sm"
              value={section.subHeading}
              onChange={(e) => handleChange(e, index)}
            />

            {section.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="point"
                  placeholder={`Point ${pointIndex + 1}`}
                  className="w-full p-2 border rounded-md outline-0 border-[#e2e2e2] sm:text-base text-sm"
                  value={point}
                  onChange={(e) => handleChange(e, index, pointIndex)}
                />
                {section.points.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePoint(index, pointIndex)}
                    className="text-red-500 bg-red-100 p-2 rounded-md"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded sm:text-base text-sm"
              onClick={() => addPoint(index)}
            >
              + Add Point
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSubSection}
          className="bg-green-500 text-white px-4 py-2 rounded sm:text-base text-sm"
        >
          + Add SubSection
        </button>

        <div>
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
              onChange={handleImageChange}
              required={!editId}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded sm:text-base text-sm"
        >
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">All Day Use Rooms</h3>
        <div className="grid gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="border border-[#e2e2e2] rounded p-4 shadow-sm"
            >
              <div className="flex sm:flex-row flex-col gap-4">
                <div>
                  <h4 className="font-bold lg:text-xl text-base mb-2">{room.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {room.mainHeading}
                  </p>

                  {/* SubSections */}
                  {room.subSections.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h5 className="font-semibold text-md">
                        {section.subHeading}
                      </h5>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {section.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="h-min">
                  {/* Room Image */}
                  {room.image && (
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-[400px] h-56 max-h-64 object-contain rounded-lg mb-3"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(room)}
                  className="text-green-600 bg-green-100 hover:bg-green-200 p-2 rounded-md"
                >
                  <HiPencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-md"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayUseRoom;
