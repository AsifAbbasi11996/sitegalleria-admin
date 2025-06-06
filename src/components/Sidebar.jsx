import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [hotelDropdownOpen, setHotelDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setOpen(true); // Always open on desktop
      } else {
        setOpen(false); // Closed by default on mobile
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <div className="flex h-screen sticky top-0 z-50">
      {/* Menu toggle button (visible only on mobile) */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-6 left-4 z-50 bg-gray-900 text-white p-2 rounded-md md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white p-4 z-40 transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "w-64" : "lg:w-64 md:w-52 md:relative md:translate-x-0"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl font-bold ml-20 mt-3 md:mt-0 md:ml-0`}>
            Admin
          </h1>
          {!isMobile && (
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
            >
              {open ? (
                <X size={20} className="md:hidden" />
              ) : (
                <Menu size={20} />
              )}
            </button>
          )}
        </div>

        <nav className="space-y-2 lg:text-base text-sm">
          <Link
            to="/logo"
            onClick={handleLinkClick}
            className={`block py-2 px-4 rounded transition duration-200 ${
              location.pathname === "/logo"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            Logo
          </Link>
          {/* Home Pages Dropdown */}
          <div>
            <button
              onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
              className={`w-full flex justify-between items-center py-2 px-4 mb-2 rounded transition duration-200 ${
                location.pathname.startsWith("/homepage")
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <span>Home Pages</span>
              {homeDropdownOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {homeDropdownOpen && (
              <div className="ml-4 bg-gray-800 rounded-md">
                <Link
                  to="/homepage/home-slider"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/home-slider"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Home Slider
                </Link>
                <Link
                  to="/homepage/locations"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/locations"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Location
                </Link>
                <Link
                  to="/homepage/famous-hotel-slider"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/famous-hotel-slider"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Famous Hotel Slider
                </Link>
                <Link
                  to="/homepage/hotels"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 rounded transition duration-200 ${
                    location.pathname === "/homepage/hotels"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Hotels
                </Link>
                <Link
                  to="/homepage/banner"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 rounded transition duration-200 ${
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
          <div>
            <button
              onClick={() => setHotelDropdownOpen(!hotelDropdownOpen)}
              className={`w-full flex justify-between items-center py-2 px-4 mb-2 rounded transition duration-200 ${
                location.pathname.startsWith("/hotelpage")
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <span>Hotels Pages</span>
              {hotelDropdownOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {hotelDropdownOpen && (
              <div className="ml-4 bg-gray-800 rounded-md">
                <Link
                  to="/hotelpage/all-hotels"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 my-2 rounded transition duration-200 ${
                    location.pathname === "/hotelpage/all-hotels"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  All Hotels
                </Link>
                <Link
                  to="/hotelpage/add-hotel"
                  onClick={handleLinkClick}
                  className={`block py-2 px-3 my-2 rounded transition duration-200 ${
                    location.pathname === "/hotelpage/add-hotel"
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Add Hotel
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/rooms"
            onClick={handleLinkClick} 
            className={`block py-2 px-4 my-2 rounded transition duration-200 ${
              location.pathname === "/rooms"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            Rooms
          </Link>
        </nav>
      </div>
    </div>
  );
}
