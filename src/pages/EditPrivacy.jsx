import { useEffect, useState } from "react";
import axios from "axios";
import PolicyEditor from "./PolicyEditor";
import { LockIcon } from "lucide-react"; // Optional icon
import { API_URL } from "../utils/baseUrl";
import toast from "react-hot-toast";

function EditPrivacy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/policy/privacy`)
      .then((res) => setContent(res.data.content))
      .catch((err) => console.error("Error fetching privacy policy:", err));
  }, []);

  const handleSave = () => {
    axios
      .put(`${API_URL}/policy/privacy`, { content })
      .then(() =>
        toast.success("Privacy Policy updated successfully", { duration: 5000 })
      )
      .catch((err) => {
        console.error("Error saving privacy policy:", err);
        toast.error("Failed to update Privacy Policy", { duration: 5000 });
      });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <LockIcon className="text-blue-600 w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Edit Privacy Policy</h2>
            <p className="text-gray-500 text-sm">
              Update and manage your privacy policy content.
            </p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-md overflow-hidden">
          <PolicyEditor initialValue={content} onChange={setContent} />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPrivacy;
