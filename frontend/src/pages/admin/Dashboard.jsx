import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();
  const sideItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Kategori', path: '/category' },
    { label: 'Produk', path: '/products' },
    { label: 'Users', path: '/users' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r border-gray-200">
        <div className="h-full px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {sideItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">
                      {/* Icon placeholder */}
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 bg-white min-h-screen">
        <Outlet /> {/* Tempat semua halaman ditampilkan */}
      </div>
    </div>
  );
};

export default DashboardLayout;
