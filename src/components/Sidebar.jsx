import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const navLinks = [
    { path: '/slider', label: 'Slider' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/hotels', label: 'Hotels' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${open ? 'w-64' : 'w-16'} p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl font-bold transition-opacity ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Admin
          </h1>
          <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2 px-4 rounded transition duration-200 ${
                location.pathname === link.path
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              {open ? link.label : <span className="sr-only">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
