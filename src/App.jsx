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

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1">
        {!isLoginPage && <Navbar />}
        <main className="md:p-6 p-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/homepage/home-slider"
              element={
                <ProtectedRoute>
                  <HomeSlider />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/famous-hotel-slider"
              element={
                <ProtectedRoute>
                  <SliderManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/locations"
              element={
                <ProtectedRoute>
                  <LocationManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/banner"
              element={
                <ProtectedRoute>
                  <BannerManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/hotels/add"
              element={
                <ProtectedRoute>
                  <AddHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/hotels/edit/:id"
              element={
                <ProtectedRoute>
                  <EditHotel />
                </ProtectedRoute>
              }
            />
            <Route path="/homepage/hotels" element={<Hotel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
