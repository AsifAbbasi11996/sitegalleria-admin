import { LogOut } from "lucide-react";
import logo from "../assets/logo.avif";

export default function Navbar() {
  const profileName = "Admin"; // You can dynamically fetch this if needed

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between shadow">
      {/* Left: Logo */}
      <div>
        <img
          src={logo} // Place your logo in the public folder or change the path accordingly
          alt="Logo"
          className="w-auto h-[50px] object-contain"
        />
      </div>

      {/* Right: Profile Name */}

      <div className="flex items-center gap-2.5">
        <div className="text-sm sm:text-base">
          Welcome, <span className="font-medium">{profileName}</span>
        </div>

        <div className="cursor-pointer hover:bg-[#dcdcdc] hover:text-black p-2.5 rounded-md">
          <LogOut onClick={handleLogout} />
        </div>
      </div>
    </nav>
  );
}
