import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import logo from "../../public/logo.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [profileName, setProfileName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUsername");
    if (storedUsername) {
      setProfileName(storedUsername);
    }
  }, []);

 const handleLogout = () => {
  try {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    toast.success("Logged out successfully", { duration: 5000 });
    navigate("/admin/"); // navigate must be called as a function
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to log out. Please try again.", { duration: 5000 });
  }
};


  return (
    <nav className="sticky top-0 z-10 bg-gray-800 text-white p-4 flex items-center md:justify-between justify-end-safe shadow">
      {/* Left: Logo */}
      <div className="mr-15">
        <img src={logo} alt="Logo" className="w-auto h-[50px] object-contain" />
      </div>

      {/* Right: Profile Name and Logout */}
      <div className="flex items-center gap-2.5">
        {profileName && (
          <div className="text-sm sm:text-base">
            Welcome,{" "}
            <span className="font-medium capitalize">{profileName}</span>
          </div>
        )}
        <div
          className="cursor-pointer hover:bg-[#dcdcdc] hover:text-black p-2.5 rounded-md"
          onClick={handleLogout}
        >
          <LogOut />
        </div>
      </div>
    </nav>
  );
}
