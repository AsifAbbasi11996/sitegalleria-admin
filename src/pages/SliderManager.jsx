import { useEffect, useState } from "react";
import { uploadSlider, getSliders } from "../api/api";
import { CloudUpload } from "lucide-react";

export default function SliderManager() {
  const [image, setImage] = useState(null);
  const [imageWithName, setImageWithName] = useState(null);
  const [sliders, setSliders] = useState([]);

  const fetchSliders = async () => {
    const res = await getSliders();
    setSliders(res.data);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("imageWithName", imageWithName);

    await uploadSlider(formData);
    fetchSliders();
  };

  return (
    <div className="p-6 py-2">
      <h1 className="text-xl font-bold mb-4">Manage Slider Images</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-3"
      >
        <label
          htmlFor="firstImage"
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <CloudUpload size={30} />
            <p>Click here to upload first image</p>
            <p className="uppercase text-[12px]">svg, png, jpeg, webp, avif</p>
          </div>
          <input
            type="file"
            id="firstImage"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>
        <label
          htmlFor="secondImage"
          className="text-[#b2b2b2] border-[3px] border-dashed border-[#e1e1e1] p-3 rounded-md cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <CloudUpload size={30} />
            <p>Click here to upload hover image</p>
            <p className="uppercase text-[12px]">svg, png, jpeg, webp, avif</p>
          </div>
          <input
            type="file"
            id="secondImage"
            className="hidden"
            onChange={(e) => setImageWithName(e.target.files[0])}
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Add this Slide
        </button>
      </form>
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
