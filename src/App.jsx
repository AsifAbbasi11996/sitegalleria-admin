import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SliderManager from './pages/SliderManager';
import DestinationManager from './pages/DestinationManager';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Hotel from './pages/Hotel';
import EditHotel from './pages/EditHotel';
import AddHotel from './pages/AddHotel';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1">
        {!isLoginPage && <Navbar />}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/slider"
              element={
                <ProtectedRoute>
                  <SliderManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/destinations"
              element={
                <ProtectedRoute>
                  <DestinationManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/add"
              element={
                <ProtectedRoute>
                  <AddHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hotels/edit/:id"
              element={
                <ProtectedRoute>
                  <EditHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotels"
              element={
                  <Hotel />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
