import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SliderManager from './pages/SliderManager';
import DestinationManager from './pages/DestinationManager';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1">
        {!isLoginPage && <Navbar />}
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
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
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
