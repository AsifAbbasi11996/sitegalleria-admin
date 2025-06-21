import { useEffect, useState } from "react";
import {
  getHomeContact,
  addHomeContact,
  updateHomeContact,
  deleteHomeContact,
} from "../api/homeApi"; // adjust path if needed
import { CloudUpload } from "lucide-react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const HomeContact = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    email: "",
    phone: "",
    bgImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await getHomeContact();
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bgImage") {
      setForm((prev) => ({ ...prev, bgImage: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("email", form.email);
    formData.append("phone", form.phone);

    if (form.bgImage) {
      formData.append("bgImage", form.bgImage);
    }

    try {
      if (editId) {
        await updateHomeContact(editId, formData);
        toast.success("Contact updated successfully", { duration: 5000 });
      } else {
        await addHomeContact(formData);
        toast.success("Contact added successfully", { duration: 5000 });
      }

      resetForm();
      fetchContacts();
    } catch (err) {
      console.error("Failed to submit form", err);
      toast.error("Error in submitting form", { duration: 5000 });
    }
  };

  const handleEdit = (contact) => {
    setForm({
      title: contact.title,
      description: contact.description,
      email: contact.email,
      phone: contact.phone,
      bgImage: null,
    });
    setEditId(contact._id);
    setPreview(contact.bgImage);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteHomeContact(id);
        toast.success("Contact deleted successfully", { duration: 5000 });
        fetchContacts();
      } catch (err) {
        console.error("Delete failed", err);
        toast.error("Error in deleting contact", { duration: 5000 });
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      email: "",
      phone: "",
      bgImage: null,
    });
    setPreview(null);
    setEditId(null);
  };

  return (
    <div className="md:p-6 p-2 py-2">
      <h2 className="md:text-2xl text-xl font-bold text-center mb-4">
        Manage Home Contact
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 rounded outline-0 border border-[#e2e2e2] md:text-base text-sm"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full h-40 p-2 rounded outline-0 border border-[#e2e2e2] md:text-base text-sm"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded outline-0 border border-[#e2e2e2] md:text-base text-sm"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 rounded outline-0 border border-[#e2e2e2] md:text-base text-sm"
        />
        <label
          htmlFor="bgImage"
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
              <p className="md:text-base text-xs">Upload Background</p>
              <p className="uppercase md:text-[12px] text-[10px] text-center">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="bgImage"
            name="bgImage"
            className="hidden"
            onChange={handleChange}
            required={!editId}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded md:text-base text-sm"
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

      <h3 className="text-lg font-semibold mb-2">All Home Contacts</h3>
      <div className="">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="border border-[#e4e4e4] p-4 rounded shadow"
          >
            <img
              src={contact.bgImage}
              alt=""
              className="h-32 w-full object-cover rounded mb-2"
            />
            <h4 className="font-bold">{contact.title}</h4>
            <p className="md:text-base text-sm">{contact.description}</p>
            <p className="text-sm text-gray-600">
              {contact.email} | {contact.phone}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(contact)}
                className="text-green-500 hover:text-green-700 bg-green-100 p-2 rounded-md cursor-pointer"
              >
                <HiPencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-md cursor-pointer"
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

export default HomeContact;
