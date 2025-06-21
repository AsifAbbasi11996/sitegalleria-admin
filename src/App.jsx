import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SliderManager from "./pages/SliderManager";
import LocationManager from "./pages/LocationManager";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Hotel from "./pages/Hotel";
import EditHotel from "./pages/EditHotel";
import AddHotel from "./pages/AddHotel";
import HomeSlider from "./pages/HomeSlider";
import BannerManager from "./pages/BannerManager";
import LogoManager from "./pages/LogoManager";
import AddNewHotel from "./pages/AddNewHotel";
import AllHotels from "./pages/AllHotels";
import EditNewHotel from "./pages/EditNewHotel";
import HomeContact from "./pages/HomeContact";
import HomeAbout from "./pages/HomeAbout";
import RoomManager from "./pages/RoomManager";
import BanquetManager from "./pages/BanquetManager";
import About from "./pages/About";
import DayUseRoom from "./pages/DayUseRoom";
import EditPrivacy from "./pages/EditPrivacy";
import EditTerms from "./pages/EditTerms";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/";

  return (
    <>
      <div className="flex">
        {!isLoginPage && <Sidebar />}
        <div className="flex-1">
          {!isLoginPage && <Navbar />}
          <main className="md:p-6 p-3">
            <Routes>
              <Route path="/admin/" element={<Login />} />
              <Route
                path="/admin/navbar/logo"
                element={
                  <ProtectedRoute>
                    <LogoManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/home-slider"
                element={
                  <ProtectedRoute>
                    <HomeSlider />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/home-contact"
                element={
                  <ProtectedRoute>
                    <HomeContact />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/home-about"
                element={
                  <ProtectedRoute>
                    <HomeAbout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/famous-hotel-slider"
                element={
                  <ProtectedRoute>
                    <SliderManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/navbar/locations"
                element={
                  <ProtectedRoute>
                    <LocationManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/banner"
                element={
                  <ProtectedRoute>
                    <BannerManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/hotels/add"
                element={
                  <ProtectedRoute>
                    <AddHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/hotels/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hotelpage/all-hotels"
                element={
                  <ProtectedRoute>
                    <AllHotels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hotelpage/add-hotel"
                element={
                  <ProtectedRoute>
                    <AddNewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hotelpage/edit-hotel/:id"
                element={
                  <ProtectedRoute>
                    <EditNewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/homepage/hotels"
                element={
                  <ProtectedRoute>
                    <Hotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/about-us"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/rooms"
                element={
                  <ProtectedRoute>
                    <RoomManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/banquets"
                element={
                  <ProtectedRoute>
                    <BanquetManager />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/day-use-rooms"
                element={
                  <ProtectedRoute>
                    <DayUseRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-terms"
                element={
                  <ProtectedRoute>
                    <EditTerms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-policy"
                element={
                  <ProtectedRoute>
                    <EditPrivacy />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
