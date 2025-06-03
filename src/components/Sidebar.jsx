import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
          open ? "w-64" : "w-16"
        } p-4`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-xl font-bold transition-opacity ${
              open ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Admin
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="text-white focus:outline-none"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          {/* Home Pages Dropdown */}
          <div>
            <button
              onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
              className={`w-full flex justify-between items-center py-2 px-4 rounded transition duration-200 ${
                location.pathname === "/homepage"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {open && <span>Home Pages</span>}
              {open &&
                (homeDropdownOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                ))}
              {!open && <span className="sr-only">Home Pages</span>}
            </button>
            {homeDropdownOpen && open && (
              <div className="ml-4 space-y-1 mt-1">
                <Link
                  to="/homepage/home-slider"
                  className={`block py-1 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/home-slider"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Home Slider
                </Link>
                <Link
                  to="/homepage/locations"
                  className={`block py-1 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/locations"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Location
                </Link>
                <Link
                  to="/homepage/famous-hotel-slider"
                  className={`block py-1 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/famous-hotel-slider"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Famous Hotel Slider
                </Link>
                <Link
                  to="/homepage/hotels"
                  className={`block py-1 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/hotels"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Hotels
                </Link>
                <Link
                  to="/homepage/banner"
                  className={`block py-1 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/banner"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Banner
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            to="/rooms"
            className={`block py-2 px-4 rounded transition duration-200 ${
              location.pathname === "/rooms"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {open ? "Rooms" : <span className="sr-only">Rooms</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
}
