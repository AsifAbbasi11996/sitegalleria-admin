import { useEffect, useState } from 'react';
import axios from 'axios';
import PolicyEditor from './PolicyEditor';
import { ShieldCheckIcon } from 'lucide-react'; // Optional, or use any icon library
import { API_URL } from '../utils/baseUrl';

function EditTerms() {
  const [content, setContent] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/policy/terms`)
      .then(res => setContent(res.data.content))
      .catch(err => console.error('Error fetching terms:', err));
  }, []);

  const handleSave = () => {
    axios
      .put(`${API_URL}/policy/terms`, { content })
      .then(() => alert('✅ Terms and Conditions updated successfully'))
      .catch(err => console.error('Error saving terms:', err));
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <ShieldCheckIcon className="text-blue-600 w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Edit Terms & Conditions</h2>
            <p className="text-gray-500 text-sm">Update and manage your site's terms easily.</p>
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

export default EditTerms;
