import { useEffect, useState } from "react";
import { uploadSlider, getSliders } from "../api/api";
import { CloudUpload } from "lucide-react";

export default function SliderManager() {
  const [image, setImage] = useState(null);
  const [imageWithName, setImageWithName] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

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

    await uploadSlider(formData);
    fetchSliders();

    setSuccessMsg("Slider successfully added ✅");

    // Clear form and previews
    setImage(null);
    setImageWithName(null);
    setPreview1(null);
    setPreview2(null);

    // Remove the message after 3 seconds
    setTimeout(() => setSuccessMsg(""), 3000);
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
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer w-52 h-52 flex items-center justify-center flex-col"
        >
          {preview1 ? (
            <img
              src={preview1}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <>
              <CloudUpload size={30} />
              <p>Upload first image</p>
              <p className="uppercase text-[12px]">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="firstImage"
            className="hidden"
            onChange={handleImageChange}
            required
          />
        </label>

        <label
          htmlFor="secondImage"
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer w-52 h-52 flex items-center justify-center flex-col"
        >
          {preview2 ? (
            <img
              src={preview2}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <>
              <CloudUpload size={30} />
              <p>Upload hover image</p>
              <p className="uppercase text-[12px]">
                svg, png, jpeg, webp, avif
              </p>
            </>
          )}
          <input
            type="file"
            id="secondImage"
            className="hidden"
            onChange={handleImageWithNameChange}
            required
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer h-12 self-end"
        >
          Add this Slide
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 text-center font-medium m-4">{successMsg}</p>
      )}

      <div className="mt-6 grid md:grid-cols-3 grid-cols-2 gap-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="p-2 border border-[#b5b5b5] rounded">
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
          </div>
        ))}
      </div>
    </div>
  );
}
