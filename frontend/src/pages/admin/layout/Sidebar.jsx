import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Box,
  Tags,
  History,
  Users,
  ChevronRight,
  ChevronLeft,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Products', icon: <Box size={20} />, path: '/admin/products' },
    { name: 'Category', icon: <Tags size={20} />, path: '/admin/categories' },
    {
      name: 'Transactions',
      icon: <History size={20} />,
      path: '/admin/history-transaction'
    },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/users' }
  ];

  const renderMenu = () =>
    menuItems.map((item, index) =>
      item.children ? (
        <div key={index}>
          <button
            onClick={() => setSubmenuOpen(!submenuOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-700 rounded transition"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </div>
            {!isCollapsed && (
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${submenuOpen ? 'rotate-90' : ''}`}
              />
            )}
          </button>
          {submenuOpen && !isCollapsed && (
            <div className="ml-8 mt-1 space-y-1">
              {item.children.map((child, i) => (
                <NavLink
                  to={child.path}
                  key={i}
                  className={({ isActive }) =>
                    `block text-sm px-4 py-1 rounded hover:bg-gray-700 transition ${
                      isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`
                  }
                >
                  {child.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-300'
            }`
          }
        >
          {item.icon}
          {!isCollapsed && <span>{item.name}</span>}
        </NavLink>
      )
    );

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
      >
        {mobileOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-40 top-0 left-0 h-full transition-all duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          bg-gray-800 text-white flex flex-col
        `}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className={`text-lg font-bold ${isCollapsed ? 'hidden' : 'block'}`}>KasirApp</span>
          <button onClick={toggleSidebar} className="hidden md:block text-gray-400 hover:text-white">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-2 space-y-2">{renderMenu()}</div>

        {/* User Profile
        <div className="p-4 border-t border-gray-700 flex items-center gap-2">
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <button className="text-xs text-red-400 hover:underline flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
