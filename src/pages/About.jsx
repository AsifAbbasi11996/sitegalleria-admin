import { useEffect, useState } from "react";
import {
  getAbout,
  updateAbout,
  deleteAbout,
  addService,
  deleteService,
  updateService,
} from "../api/aboutUsApi";
import { CloudUpload } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import toast from "react-hot-toast";

const About = () => {
  const [about, setAbout] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newService, setNewService] = useState({
    place: "",
    description: "",
    service: [""],
  });
  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await getAbout();
      setAbout(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(about).forEach(([key, value]) => {
      if (
        key !== "services" &&
        key !== "previewBg1" &&
        key !== "previewBg2" &&
        value
      ) {
        formData.append(key, value);
      }
    });

    try {
      await updateAbout(formData);
      toast.success("About page updated successfully", { duration: 5000 });
      fetchAbout();
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Error in updating about page", { duration: 5000 });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAbout();
      toast.success("Deleted successfully", { duration: 5000 });
      setAbout(null);
    } catch (err) {
      console.error(err);
      toast.error("Error in deleting About page", { duration: 5000 });
    }
  };

  const handleAddService = async () => {
    try {
      const body = {
        place: newService.place,
        description: newService.description,
        service: newService.service,
      };
      await addService(body);
      toast.success("Service added successfully", { duration: 5000 });
      setNewService({ place: "", description: "", service: [""] });
      fetchAbout();
    } catch (err) {
      console.error(err);
      toast.error("Service not added", { duration: 5000 });
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
      toast.success("Service deleted successfully", { duration: 5000 });
      fetchAbout();
    } catch (err) {
      console.error(err);
      toast.error("Error in deleting service", { duration: 5000 });
    }
  };

  const handleUpdateService = async (id) => {
    try {
      await updateService(id, newService);
      toast.success("Service updated successfully", { duration: 5000 });
      setNewService({ place: "", description: "", service: [""] });
      setEditingServiceId(null);
      fetchAbout();
    } catch (err) {
      console.error(err);
      toast.error("Error in updating service", { duration: 5000 });
    }
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setNewService({ place: "", description: "", service: [""] });
  };

  const handleServiceChange = (index, value) => {
    const updated = [...newService.service];
    updated[index] = value;
    setNewService((prev) => ({ ...prev, service: updated }));
  };

  const addServiceField = () => {
    setNewService((prev) => ({ ...prev, service: [...prev.service, ""] }));
  };

  if (!about) return <div className="p-4">No About data found.</div>;

  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold">About Us</div>

      <div className="">
        {editing ? (
          <>
            <div>
              <div className="flex sm:flex-row flex-col gap-4">
                <div className="sm:w-1/2 flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="">Above title</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 sm:text-base text-sm"
                      placeholder="Title1"
                      value={about.title1 || ""}
                      onChange={(e) =>
                        setAbout({ ...about, title1: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>Above bg image</p>
                    <label
                      htmlFor="bg1"
                      className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:h-52 sm:w-full w-[300px] h-40 flex items-center justify-center flex-col transition hover:border-blue-500 group"
                    >
                      {about.previewBg1 || typeof about.bg1 === "string" ? (
                        <img
                          src={
                            about.previewBg1
                              ? about.previewBg1
                              : typeof about.bg1 === "string"
                              ? about.bg1
                              : ""
                          }
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <CloudUpload
                            size={30}
                            className="text-blue-500 mb-2"
                          />
                          <p className="md:text-base text-xs">Upload Image</p>
                          <p className="uppercase md:text-[12px] text-[10px] text-center">
                            svg, png, jpeg, webp, avif
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        id="bg1"
                        name="bg1"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setAbout((prev) => ({
                              ...prev,
                              bg1: file,
                              previewBg1: URL.createObjectURL(file),
                            }));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Service title</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md outline-0 mt-1 p-2 sm:text-base text-sm"
                      placeholder="Title"
                      value={about.title || ""}
                      onChange={(e) =>
                        setAbout({ ...about, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Service Heading</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 sm:text-base text-sm"
                      placeholder="Heading"
                      value={about.heading || ""}
                      onChange={(e) =>
                        setAbout({ ...about, heading: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="sm:w-1/2 flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="">Below title</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 sm:text-base text-sm"
                      placeholder="Title2"
                      value={about.title2 || ""}
                      onChange={(e) =>
                        setAbout({ ...about, title2: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>Below bg image</p>
                    <label
                      htmlFor="bg2"
                      className="text-[#b2b2b2] border-2 border-dashed border-gray-300 p-3 rounded-xl cursor-pointer md:h-52 sm:w-full w-[300px] h-40 flex items-center justify-center flex-col transition hover:border-blue-500 group"
                    >
                      {about.previewBg2 || typeof about.bg1 === "string" ? (
                        <img
                          src={
                            about.previewBg2
                              ? about.previewBg2
                              : typeof about.bg2 === "string"
                              ? about.bg2
                              : ""
                          }
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <CloudUpload
                            size={30}
                            className="text-blue-500 mb-2"
                          />
                          <p className="md:text-base text-xs">Upload Image</p>
                          <p className="uppercase md:text-[12px] text-[10px] text-center">
                            svg, png, jpeg, webp, avif
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        id="bg2"
                        name="bg2"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setAbout((prev) => ({
                              ...prev,
                              bg2: file,
                              previewBg2: URL.createObjectURL(file),
                            }));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex sm:flex-row flex-col sm:items-center gap-3">
                    <label htmlFor="">Link Text</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md outline-0 p-2 sm:text-base text-sm"
                      placeholder="LinkText"
                      value={about.linkText || ""}
                      onChange={(e) =>
                        setAbout({ ...about, linkText: e.target.value })
                      }
                    />
                    <label htmlFor="">Link</label>
                    <input
                      className="border border-[#e2e2e2] rounded-md outline-0 p-2 sm:text-base text-sm"
                      placeholder="Link"
                      value={about.link || ""}
                      onChange={(e) =>
                        setAbout({ ...about, link: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Description:</label>
                    <textarea
                      className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 h-40 sm:text-base text-sm"
                      placeholder="Description"
                      value={about.desc || ""}
                      onChange={(e) =>
                        setAbout({ ...about, desc: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-3"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="sm:w-1/2 space-y-4">
                <p className="">
                  <strong>Title:</strong> {about.title1}
                </p>
                <div>
                  <p>
                    <strong>Background image</strong>{" "}
                  </p>
                  <img
                    src={about.bg1}
                    alt="bg1"
                    className="w-full h-48 object-cover rounded-md mt-3"
                  />
                </div>
                <div>
                  <p className="">
                    <strong>Service title:</strong> {about.title}
                  </p>
                  <p className="">
                    <strong>Service heading:</strong> {about.heading}
                  </p>
                </div>
              </div>
              <div className="sm:w-1/2 space-y-4">
                <p>
                  <strong>Title:</strong> {about.title2}
                </p>
                <div>
                  <p>
                    <strong>Background image</strong>{" "}
                  </p>
                  <img
                    src={about.bg2}
                    alt="bg2"
                    className="w-full h-48 object-cover rounded-md mt-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p>
                    <strong>Link Text: </strong> {about.linkText}
                  </p>
                  <p>
                    <strong>Link: </strong> {about.link}
                  </p>
                </div>
                <p className="text-sm">
                  <strong>Description:</strong> {about.desc}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        <button
          className="bg-yellow-500 text-white px-4 py-2"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* SERVICES */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 sm:space-y-4">
          {about.services?.map((s) => (
            <div
              key={s._id}
              className="border border-[#e2e2e2] p-4 rounded shadow"
            >
              <p className="font-bold">{s.place}</p>
              <p className="sm:text-base text-sm">{s.description}</p>
              <ul className="list-disc pl-5">
                {s.service.map((item, idx) => (
                  <li className="sm:text-base text-sm" key={idx}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => {
                    setNewService(s);
                    setEditingServiceId(s._id);
                  }}
                  className="bg-green-100 text-green-500 p-2 rounded-md"
                >
                  <HiPencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteService(s._id)}
                  className="bg-red-100 text-red-500 p-2 rounded-md"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold">
            {editingServiceId ? "Edit" : "Add New"} Service
          </h3>
          <input
            className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 w-full sm:text-base text-sm"
            placeholder="Place"
            value={newService.place}
            onChange={(e) =>
              setNewService({ ...newService, place: e.target.value })
            }
            required
          />
          <textarea
            className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 w-full h-40 sm:text-base text-sm"
            placeholder="Description"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            required
          />
          {newService.service.map((item, index) => (
            <input
              key={index}
              className="border border-[#e2e2e2] rounded-md mt-1 outline-0 p-2 w-full sm:text-base text-sm"
              placeholder={`Service ${index + 1}`}
              value={item}
              onChange={(e) => handleServiceChange(index, e.target.value)}
              required
            />
          ))}
          <button
            onClick={addServiceField}
            className="bg-gray-500 text-white px-3 py-1"
          >
            Add More
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={
                editingServiceId
                  ? () => handleUpdateService(editingServiceId)
                  : handleAddService
              }
              className="bg-green-600 text-white px-4 py-2 sm:text-base text-sm"
            >
              {editingServiceId ? "Update Service" : "Add Service"}
            </button>
            {editingServiceId && (
              <button
                onClick={handleCancelServiceEdit}
                className="bg-red-500 text-white px-4 py-2 sm:text-base text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={handleDelete}
        >
          Delete Entire About Section
        </button>
      </div>
    </div>
  );
};

export default About;
